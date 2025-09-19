// API Configuration
export const API_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
} as const;

// Validate API key
export const validateApiKey = (): boolean => {
  if (!API_CONFIG.GEMINI_API_KEY) {
    console.error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
    return false;
  }
  return true;
};
