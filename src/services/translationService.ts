import { API_CONFIG, validateApiKey } from '../config/api';

interface TranslationCache {
  [key: string]: string;
}

class TranslationService {
  private cache: TranslationCache = {};
  private readonly CACHE_KEY = 'translation-cache';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.loadCache();
  }

  private loadCache(): void {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < this.CACHE_EXPIRY) {
          this.cache = data;
        }
      }
    } catch (error) {
      console.warn('Failed to load translation cache:', error);
    }
  }

  private saveCache(): void {
    try {
      const cacheData = {
        data: this.cache,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save translation cache:', error);
    }
  }

  async translateText(text: string, targetLanguage: 'hi'): Promise<string> {
    // Check cache first
    const cacheKey = `${text}_${targetLanguage}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      if (!validateApiKey()) {
        throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
      }

      const requestBody = {
        contents: [{
          parts: [{
            text: `Translate the following English text to Hindi (Devanagari script). Only return the translated text, no explanations or additional text:\n\n${text}`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        }
      };

      const response = await fetch(API_CONFIG.GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_CONFIG.GEMINI_API_KEY,
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Translation API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from translation API');
      }

      const translatedText = data.candidates[0].content.parts[0].text.trim();
      
      // Cache the result
      this.cache[cacheKey] = translatedText;
      this.saveCache();
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Return original text if translation fails
      return text;
    }
  }

  async translateBatch(texts: string[], targetLanguage: 'hi'): Promise<string[]> {
    const results: string[] = [];
    const uncachedTexts: { text: string; index: number }[] = [];

    // Check cache for each text
    texts.forEach((text, index) => {
      const cacheKey = `${text}_${targetLanguage}`;
      if (this.cache[cacheKey]) {
        results[index] = this.cache[cacheKey];
      } else {
        uncachedTexts.push({ text, index });
      }
    });

    // Translate uncached texts
    if (uncachedTexts.length > 0) {
      try {
        if (!validateApiKey()) {
          throw new Error('Gemini API key not found');
        }

        const batchText = uncachedTexts.map(item => item.text).join('\n---\n');
        
        const response = await fetch(API_CONFIG.GEMINI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_CONFIG.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Translate the following English texts to Hindi (Devanagari script). Each text is separated by "---". Return only the translated texts in the same order, separated by "---". No explanations or additional text:\n\n${batchText}`
              }]
            }],
            generationConfig: {
              temperature: 0.3,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Translation API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          throw new Error('Invalid response from translation API');
        }

        const translatedBatch = data.candidates[0].content.parts[0].text.trim();
        const translatedTexts = translatedBatch.split('---').map((text: string) => text.trim());

        // Update results and cache
        uncachedTexts.forEach((item, i) => {
          const translatedText = translatedTexts[i] || item.text;
          results[item.index] = translatedText;
          
          const cacheKey = `${item.text}_${targetLanguage}`;
          this.cache[cacheKey] = translatedText;
        });

        this.saveCache();
      } catch (error) {
        console.error('Batch translation error:', error);
        // Fill in original texts for failed translations
        uncachedTexts.forEach(item => {
          results[item.index] = item.text;
        });
      }
    }

    return results;
  }

  clearCache(): void {
    this.cache = {};
    localStorage.removeItem(this.CACHE_KEY);
  }
}

export const translationService = new TranslationService();
