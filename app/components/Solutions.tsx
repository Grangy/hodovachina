'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface Solution {
  title: string;
  description: string;
  icon: string;
}

const solutions: Solution[] = [
  {
    title: 'Для владельцев брендов',
    description: 'Помощь с производством и брендингом',
    icon: '🎨'
  },
  {
    title: 'Для производителей',
    description: 'Закупка комплектующих или упаковки',
    icon: '🏭'
  },
  {
    title: 'Для селлеров',
    description: 'Поиск поставщика, сертификация для маркетплейсов',
    icon: '🛒'
  },
  {
    title: 'Для оптовиков',
    description: 'Оптовые закупки напрямую с фабрик',
    icon: '📦'
  },
  {
    title: 'Для дистрибьюторов',
    description: 'Организация поставок для вашей сети',
    icon: '🚚'
  },
  {
    title: 'Для предпринимателей',
    description: 'Индивидуальные решения под ваш бизнес',
    icon: '💼'
  }
];

export default function Solutions() {
  const [isMobile, setIsMobile] = useState(false);
  const { fadeInVariants, cardVariants, imageVariants } = useAnimationVariants(false);
  const { fadeInVariants: mobileFadeIn, cardVariants: mobileCardVariants, imageVariants: mobileImageVariants } = useAnimationVariants(true);
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
  const currentImageVariants = isMobile ? mobileImageVariants : imageVariants;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          Найдём решение{' '}
          <span className="font-handwritten text-purple-primary dark:text-purple-light monochrome:text-mono-primary blue:text-blue-primary text-3xl sm:text-4xl md:text-5xl">
            под индивидуальный запрос
          </span>
        </motion.h2>

        {/* Image */}
        <motion.div
          className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 mb-8 sm:mb-10 md:mb-12"
          variants={currentImageVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          <Image
            src="/images/individ_reshenie.png"
            alt="Индивидуальное решение"
            fill
            className="object-contain"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl hover:bg-purple-primary dark:hover:bg-purple-primary monochrome:hover:bg-mono-dark blue:hover:bg-blue-primary hover:text-white transition-all duration-300 group cursor-pointer dark:border dark:border-gray-700"
              variants={currentCardVariants(idx)}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
              whileHover={isMobile ? {} : { y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{solution.icon}</div>
              <h3 className="font-bold mb-2 text-gray-dark dark:text-white group-hover:text-white transition-colors">
                {solution.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

