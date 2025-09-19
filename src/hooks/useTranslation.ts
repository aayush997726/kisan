import { useTranslation as useTranslationContext } from '../contexts/TranslationContext';
import { translationService } from '../services/translationService';
import { useState, useCallback } from 'react';

export const useTranslation = () => {
  const context = useTranslationContext();
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = useCallback(async (text: string): Promise<string> => {
    if (context.language === 'en') {
      return text;
    }

    try {
      setIsTranslating(true);
      const translated = await translationService.translateText(text, 'hi');
      return translated;
    } catch (error) {
      return text; // Return original text on error
    } finally {
      setIsTranslating(false);
    }
  }, [context.language]);

  const translateBatch = useCallback(async (texts: string[]): Promise<string[]> => {
    if (context.language === 'en') {
      return texts;
    }

    try {
      setIsTranslating(true);
      const translated = await translationService.translateBatch(texts, 'hi');
      return translated;
    } catch (error) {
      return texts; // Return original texts on error
    } finally {
      setIsTranslating(false);
    }
  }, [context.language]);

  return {
    ...context,
    translateText,
    translateBatch,
    isTranslating: isTranslating || context.isTranslating,
  };
};
