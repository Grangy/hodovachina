'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const scrollToForm = () => {
    const targetIds = pathname === '/training'
      ? ['training-form', 'contact-form']
      : ['contact-form', 'training-form'];

    for (const id of targetIds) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center h-10 sm:h-12 md:h-14 lg:h-16"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo_black.png"
                alt="hodovachina"
                width={160}
                height={64}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Navigation + Right side */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {/* Training Link */}
            <Link href="/training">
              <motion.div
                className={`text-xs sm:text-sm md:text-base font-semibold transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ${
                  pathname === '/training'
                    ? 'bg-slate-200 text-slate-900'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Обучение</span>
                <span className="sm:hidden">Учеба</span>
              </motion.div>
            </Link>
            <motion.button
              onClick={scrollToForm}
              className="button-gradient px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="hidden sm:inline">Оставить заявку</span>
              <span className="sm:hidden">Заявка</span>
            </motion.button>
          </div>
        </div>
      </nav>
    </header>
  );
}
