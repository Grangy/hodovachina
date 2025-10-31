'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const advantages: Advantage[] = [
  {
    title: 'Работаем с проверенными фабриками',
    description: 'Огромная база надёжных производителей и поставщиков.',
    icon: <FaCheckCircle />
  },
  {
    title: 'Организуем поставки "под ключ"',
    description: 'Выкуп, проверка, доставка, растаможка.',
    icon: <FaCheckCircle />
  },
  {
    title: 'Полное документальное сопровождение',
    description: 'Все документы для белого ввоза.',
    icon: <FaCheckCircle />
  },
  {
    title: 'Проверка качества',
    description: 'Фото и видеоотчёт перед отправкой.',
    icon: <FaCheckCircle />
  },
  {
    title: 'Опыт работы с крупными и мелкими заказами',
    description: 'От 5 000 ₽ до крупных оптовых поставок.',
    icon: <FaCheckCircle />
  }
];

export default function Advantages() {
  const [isMobile, setIsMobile] = useState(false);
  const { cardVariants } = useAnimationVariants(false);
  const { cardVariants: mobileCardVariants } = useAnimationVariants(true);
  const viewportSettings = getViewportSettings(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentVariants = isMobile ? mobileCardVariants : cardVariants;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-purple-light dark:bg-gray-800 blue:bg-blue-light monochrome:bg-mono-light transition-colors overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((advantage, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-900 blue:bg-white monochrome:bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all dark:border dark:border-gray-700 monochrome:border monochrome:border-gray-300"
              variants={currentVariants(idx)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div className="text-4xl sm:text-5xl mb-4 text-purple-primary dark:text-purple-primary blue:text-blue-primary monochrome:text-mono-primary flex justify-center md:justify-start">
                {advantage.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-center md:text-left text-gray-dark dark:text-white blue:text-gray-dark monochrome:text-gray-dark transition-colors">{advantage.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 blue:text-gray-600 monochrome:text-mono-dark leading-relaxed text-center md:text-left transition-colors">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

