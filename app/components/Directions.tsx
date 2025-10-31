'use client';

import { motion } from 'framer-motion';
import { FaIndustry, FaShoppingCart, FaCog, FaPalette, FaTruck, FaBox, FaTools } from 'react-icons/fa';
import { CityData } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface DirectionsProps {
  cityData?: CityData | null;
}

interface Direction {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const directions: Direction[] = [
  {
    icon: <FaTools />,
    title: 'Выкупаем оборудование, технику, производственные линии',
    description: ''
  },
  {
    icon: <FaIndustry />,
    title: 'Оптовые поставки с фабрик',
    description: 'Проверенные производители, лучшие условия по цене и срокам.'
  },
  {
    icon: <FaShoppingCart />,
    title: 'Выкуп с китайских площадок',
    description: '1688, Taobao, Alibaba и другие. Проверяем продавца и качество.'
  },
  {
    icon: <FaCog />,
    title: 'Производство под заказ',
    description: 'Под ваш бренд, с контролем качества и фотоотчётами.'
  },
  {
    icon: <FaPalette />,
    title: 'Брендирование продукции',
    description: 'Логотип, упаковка, индивидуальный дизайн.'
  },
  {
    icon: <FaTruck />,
    title: 'Доставка и таможенное оформление',
    description: '"Белый ввоз", официальные документы, прозрачная логистика.'
  },
  {
    icon: <FaBox />,
    title: 'Совместные закупки от 5 000 ₽',
    description: 'Для небольших оптовиков. Объединяем заказы и доставляем выгодно.'
  }
];

export default function Directions({ cityData }: DirectionsProps = {}) {
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

  const currentVariants = isMobile ? mobileCardVariants : cardVariants;

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 md:pb-28 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          {cityData 
            ? `Полный цикл услуг из Китая в ${cityData.name} — от выкупа до белого ввоза`
            : 'Полный цикл услуг из Китая — от выкупа до белого ввоза'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-14">
          {directions.map((direction, idx) => (
            <motion.div
              key={idx}
              className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl hover:bg-purple-primary dark:hover:bg-purple-primary monochrome:hover:bg-mono-dark blue:hover:bg-blue-primary hover:text-white transition-all duration-300 group cursor-pointer dark:border dark:border-gray-700"
              variants={currentVariants(idx)}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
              whileHover={isMobile ? {} : { y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform text-purple-primary dark:text-white monochrome:text-mono-primary blue:text-blue-primary group-hover:text-white flex justify-center md:justify-start">
                {direction.icon}
              </div>
              <h3 className="font-bold mb-2 sm:mb-3 text-center md:text-left text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark group-hover:text-white transition-colors text-sm sm:text-base md:text-lg leading-tight">
                {direction.title}
              </h3>
              {direction.description && (
                <p className="text-xs sm:text-sm text-left text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors leading-relaxed">
                  {direction.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10 sm:mt-12 md:mt-14"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          <motion.button
            onClick={scrollToForm}
            className="bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[44px]"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Оставить заявку на подбор решения
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

