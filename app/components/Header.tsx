'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white shadow-sm transition-colors">
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-dark dark:text-white monochrome:text-gray-dark transition-colors">
                hodovachina
              </span>
            </motion.div>
          </Link>

          {/* Navigation + Right side */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {/* Training Link */}
            <Link href="/training">
              <motion.div
                className={`text-xs sm:text-sm md:text-base font-semibold transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ${
                  pathname === '/training'
                    ? 'bg-purple-light dark:bg-gray-800 text-purple-primary dark:text-purple-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-primary dark:hover:text-purple-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Обучение</span>
                <span className="sm:hidden">Учеба</span>
              </motion.div>
            </Link>

            <ThemeToggle />
            {pathname !== '/training' && (
              <motion.button
                onClick={scrollToForm}
                className="bg-black dark:bg-purple-primary blue:dark:bg-blue-primary monochrome:bg-mono-primary hover:bg-gray-dark dark:hover:bg-purple-dark blue:dark:hover:bg-blue-dark monochrome:hover:bg-mono-dark text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Оставить заявку</span>
                <span className="sm:hidden">Заявка</span>
              </motion.button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
