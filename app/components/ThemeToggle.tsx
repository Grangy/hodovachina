'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaWater, FaCircle } from 'react-icons/fa';

const themes: { value: Theme; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'light', label: 'Светлая', icon: <FaSun />, color: 'bg-yellow-400' },
  { value: 'dark', label: 'Тёмная', icon: <FaMoon />, color: 'bg-gray-800' },
  { value: 'blue', label: 'Синяя', icon: <FaWater />, color: 'bg-blue-500' },
  { value: 'monochrome', label: 'ЧБ', icon: <FaCircle />, color: 'bg-gray-500' },
];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Get theme context - will be available after mount
  let theme: Theme = 'light';
  let setTheme: (theme: Theme) => void = () => {};
  
  try {
    const context = useTheme();
    theme = context.theme;
    setTheme = context.setTheme;
  } catch {
    // Context not available during SSR, use defaults
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100">
        <FaSun className="text-xl" />
        <span className="hidden sm:inline text-sm font-medium text-gray-dark">Светлая</span>
      </div>
    );
  }

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-base sm:text-lg md:text-xl flex items-center">{currentTheme.icon}</span>
        <span className="hidden md:inline text-xs sm:text-sm font-medium text-gray-dark dark:text-white">
          {currentTheme.label}
        </span>
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === themeOption.value ? 'bg-purple-light dark:bg-purple-primary/20 blue:bg-blue-light monochrome:bg-gray-200' : ''
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-full ${themeOption.color} flex items-center justify-center text-white`}>
                  {themeOption.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-dark dark:text-white">{themeOption.label}</div>
                  {theme === themeOption.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-purple-primary dark:text-purple-light blue:text-blue-primary monochrome:text-gray-700"
                    >
                      Активна
                    </motion.div>
                  )}
                </div>
                {theme === themeOption.value && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 text-purple-primary dark:text-purple-light blue:text-blue-primary monochrome:text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

