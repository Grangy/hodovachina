'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`rounded-xl shadow-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 ${
              type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className={`flex-shrink-0 ${type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {type === 'success' ? (
                <FaCheckCircle className="text-2xl" />
              ) : (
                <FaExclamationCircle className="text-2xl" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm sm:text-base font-semibold ${
                type === 'success'
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-opacity-20 ${
                type === 'success'
                  ? 'text-green-600 dark:text-green-400 hover:bg-green-600'
                  : 'text-red-600 dark:text-red-400 hover:bg-red-600'
              }`}
            >
              <FaTimes className="text-lg" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

