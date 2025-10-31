'use client';

import { motion } from 'framer-motion';
import { CityData } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface TestimonialsProps {
  cityData?: CityData | null;
}

export default function Testimonials({ cityData }: TestimonialsProps = {}) {
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
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {cityData 
            ? `Нам доверяют клиенты в ${cityData.nameGenitive || cityData.name}`
            : 'Нам доверяют сотни клиентов по всей России'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder карточки для отзывов */}
          {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-6 rounded-xl dark:border dark:border-gray-700"
              variants={currentCardVariants(idx)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-sm">Скриншот отзыва</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 italic">
                Отзыв клиента из WhatsApp / Telegram
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder для фото */}
          {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl flex items-center justify-center"
              variants={currentImageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <span className="text-gray-400 dark:text-gray-500 text-sm">Фото заказов / производства</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

