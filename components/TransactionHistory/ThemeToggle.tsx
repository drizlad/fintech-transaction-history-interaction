import React from 'react';
import { ThemeToggleProps } from './types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="inline-flex rounded-full bg-gray-200 dark:bg-gray-700 p-1">
      <button
        onClick={() => onThemeChange('light')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentTheme === 'light'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentTheme === 'dark'
            ? 'bg-gray-800 text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        Dark
      </button>
    </div>
  );
};
