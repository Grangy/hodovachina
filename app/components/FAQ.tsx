'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Чем белая доставка отличается от карго?',
    answer: 'Белая доставка — это официальный ввоз товаров с полным пакетом документов для налоговой и таможни. Все товары оформляются легально, с уплатой всех необходимых пошлин и налогов. Карго — это неофициальная доставка без полного документального оформления.',
  },
  {
    question: 'Почему выгодно заказывать товар в Китае?',
    answer: 'Заказ товаров в Китае выгоден благодаря низкой стоимости производства, широкому ассортименту, возможности производства под заказ и быстрому развитию инноваций. Мы помогаем минимизировать риски и организуем весь процесс под ключ.',
  },
  {
    question: 'Какие требования для оформления заказа?',
    answer: 'Мы работаем с любыми клиентами, готовыми к сотрудничеству. Оплата производится в рублях по курсу на день оплаты. Никаких специальных требований нет.',
  },
  {
    question: 'Какой минимальный объём заказа?',
    answer: 'Для индивидуальных поставок минимальная сумма заказа — от 500 000 ₽. Также мы организуем совместные закупки для мелких партий от 5 000 ₽, объединяя заказы нескольких клиентов.',
  },
  {
    question: 'Какие документы вы предоставляете?',
    answer: 'Мы предоставляем полный пакет документов: инвойсы, упаковочные листы, сертификаты происхождения, таможенные декларации и все необходимые документы для бухгалтерского учёта и налоговой отчётности.',
  },
  {
    question: 'Сколько времени занимает доставка?',
    answer: 'Средний срок доставки из Китая в Россию составляет 15-25 дней в зависимости от региона отправки и выбранного способа транспортировки. Мы предоставляем точные сроки при оформлении заказа.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentListVariants = isMobile ? mobileListItemVariants : listItemVariants;
  const currentImageVariants = isMobile ? mobileImageVariants : imageVariants;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          Частые вопросы
        </motion.h2>
        
        <div className="flex justify-center mb-8 sm:mb-12">
          <motion.div
            className="relative w-full max-w-xs h-40 sm:h-48 md:h-56 lg:h-64"
            variants={currentImageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <Image
              src="/images/fuq.png"
              alt="FAQ"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 dark:border-gray-700 monochrome:border-gray-300 blue:border-gray-300 rounded-lg overflow-hidden bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white transition-colors"
              variants={currentListVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-purple-light dark:hover:bg-gray-700 blue:hover:bg-blue-light monochrome:hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark pr-2 sm:pr-4 transition-colors">{item.question}</span>
                <motion.svg
                  className="w-5 h-5 text-purple-primary dark:text-purple-light monochrome:text-mono-primary blue:text-blue-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 transition-colors">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

