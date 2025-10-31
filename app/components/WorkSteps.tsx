'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CityData } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkStepsProps {
  cityData?: CityData | null;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Оставляете заявку или пишете нам в WhatsApp',
    description: ''
  },
  {
    number: 2,
    title: 'Мы подбираем фабрики или поставщиков под ваш запрос',
    description: ''
  },
  {
    number: 3,
    title: 'Проверяем продавца, оформляем документы и выкуп',
    description: ''
  },
  {
    number: 4,
    title: 'Контролируем упаковку и отправку',
    description: ''
  },
  {
    number: 5,
    title: 'Организуем "белую" доставку и выдаём все документы',
    description: ''
  }
];

export default function WorkSteps({ cityData }: WorkStepsProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const { fadeInVariants, listItemVariants, imageVariants } = useAnimationVariants(false);
  const { fadeInVariants: mobileFadeIn, listItemVariants: mobileListItemVariants, imageVariants: mobileImageVariants } = useAnimationVariants(true);
  const viewportSettings = getViewportSettings(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentListVariants = isMobile ? mobileListItemVariants : listItemVariants;
  const currentImageVariants = isMobile ? mobileImageVariants : imageVariants;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors text-center lg:text-left"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              {cityData 
                ? `Как мы организуем поставку из Китая в ${cityData.name}`
                : 'Как мы организуем поставку из Китая'}
            </motion.h2>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, idx) => {
                let title = step.title;
                // Персонализация для шага 5 с городом
                if (idx === 4 && cityData) {
                  title = `Организуем "белую" доставку в ${cityData.name} и выдаём все документы`;
                }
                
                return (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 sm:gap-4"
                    variants={currentListVariants(idx)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                  >
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-primary dark:bg-purple-primary monochrome:bg-mono-primary blue:bg-blue-primary rounded-full flex items-center justify-center transition-colors">
                        <span className="text-white text-lg sm:text-xl font-bold">{step.number}</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">{title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 transition-colors">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              className="mt-8"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <motion.button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Рассчитать поставку
              </motion.button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="relative w-full h-64 sm:h-80 lg:h-96"
            variants={currentImageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <Image
              src="/images/postavshiki.png"
              alt="Поставщики и документы"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

