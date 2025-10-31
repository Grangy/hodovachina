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
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2 sm:px-4"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          Частые вопросы
        </motion.h2>
        
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.div
            className="relative w-full max-w-[200px] sm:max-w-xs h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56"
            variants={currentImageVariants}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 dark:border-gray-700 monochrome:border-gray-300 blue:border-gray-300 rounded-lg overflow-hidden bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white transition-colors"
              variants={currentListVariants(index)}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-left flex items-center justify-between gap-2 sm:gap-3 hover:bg-purple-light dark:hover:bg-gray-700 blue:hover:bg-blue-light monochrome:hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark leading-snug sm:leading-normal flex-1">{item.question}</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-primary dark:text-purple-light monochrome:text-mono-primary blue:text-blue-primary flex-shrink-0"
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
                    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 transition-colors leading-relaxed">
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

