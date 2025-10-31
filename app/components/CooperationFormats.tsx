'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaHandshake } from 'react-icons/fa';
import { CityData } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface CooperationFormatsProps {
  cityData?: CityData | null;
}

export default function CooperationFormats({ cityData }: CooperationFormatsProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const { fadeInVariants, cardVariants } = useAnimationVariants(false);
  const { fadeInVariants: mobileFadeIn, cardVariants: mobileCardVariants } = useAnimationVariants(true);
  const viewportSettings = getViewportSettings(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentCardVariants = isMobile ? mobileCardVariants : cardVariants;

  const openWhatsApp = () => {
    const whatsappNumber = cityData?.whatsapp || '+79991234567';
    window.open(`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`, '_blank');
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24 bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-hidden">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          Выберите формат, который подходит вашему бизнесу
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Крупный опт */}
          <motion.div
            className="bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
            variants={currentCardVariants(0)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary flex justify-center md:justify-start">
              <FaBriefcase />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center md:text-left text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors leading-tight">
              Крупный опт от 100 000 ₽
            </h3>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 text-center md:text-left">
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">—</span>
                <span>Индивидуальный подбор и закупка напрямую с фабрик.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">—</span>
                <span>Таможенные документы, логистика, сопровождение.</span>
              </li>
            </ul>
            <motion.button
              onClick={scrollToForm}
              className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Заказать оптовую поставку
            </motion.button>
          </motion.div>

          {/* Совместные закупки */}
          <motion.div
            className="bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
            variants={currentCardVariants(1)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary flex justify-center md:justify-start">
              <FaHandshake />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center md:text-left text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors leading-tight">
              Совместные закупки от 5 000 ₽
            </h3>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 text-center md:text-left">
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">—</span>
                <span>Для небольших заказов.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">—</span>
                <span>Собираем заказы клиентов, оформляем и доставляем единым грузом.</span>
              </li>
            </ul>
            <motion.button
              onClick={openWhatsApp}
              className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Присоединиться к совместной закупке
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

