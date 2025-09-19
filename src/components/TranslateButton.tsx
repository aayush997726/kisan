import React from 'react';
import { Languages, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface TranslateButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const TranslateButton: React.FC<TranslateButtonProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'default'
}) => {
  const { language, toggleLanguage, isTranslating } = useTranslation();

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50'
  };

  const handleToggle = () => {
    toggleLanguage();
  };

  const isCurrentlyTranslating = isTranslating;

  return (
    <button
      onClick={handleToggle}
      disabled={isCurrentlyTranslating}
      className={`
        flex items-center space-x-2 rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      title={language === 'en' ? 'Translate to Hindi' : 'Switch to English'}
    >
      {isCurrentlyTranslating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Languages className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </button>
  );
};

export default TranslateButton;
