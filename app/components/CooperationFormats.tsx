'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaHandshake } from 'react-icons/fa';
import { CityData, defaultCity } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';
import { useModal } from './ModalProvider';

interface CooperationFormatsProps {
  cityData?: CityData | null;
}

export default function CooperationFormats({ cityData }: CooperationFormatsProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const { openModal } = useModal();
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

  const currentCardVariants = isMobile ? mobileCardVariants : cardVariants;

  const openWhatsApp = () => {
    window.open(`https://wa.me/${defaultCity.whatsapp.replace(/[^\d]/g, '')}`, '_blank');
  };

  return (
    <section className="section-shell py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 md:pb-28 bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          Выберите формат, который подходит вашему бизнесу
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {/* Крупный опт */}
          <motion.div
            className="card-highlight bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
            variants={currentCardVariants(0)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary flex justify-center md:justify-start">
              <FaBriefcase />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-center md:text-left text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors leading-tight">
              Крупный опт от 100 000 ₽
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 text-left">
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
              onClick={openModal}
              className="button-gradient w-full px-5 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Заказать оптовую поставку
            </motion.button>
          </motion.div>

          {/* Совместные закупки */}
          <motion.div
            className="card-highlight bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
            variants={currentCardVariants(1)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary flex justify-center md:justify-start">
              <FaHandshake />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-center md:text-left text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors leading-tight">
              Совместные закупки от 5 000 ₽
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 text-left">
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
              className="button-gradient w-full px-5 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]"
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

