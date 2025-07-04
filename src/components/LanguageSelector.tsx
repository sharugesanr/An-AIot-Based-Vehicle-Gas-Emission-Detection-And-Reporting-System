import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिन्दी' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 p-2 rounded-full transition-colors ease-in-out duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-1 animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === lang.code
                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;