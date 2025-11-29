'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaRubleSign, FaHandshake, FaSearch, FaPaintBrush, FaBox, FaHeart, FaPercent, FaCheck } from 'react-icons/fa';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';
import { useModal } from './ModalProvider';

export default function Pricing() {
  const [isMobile, setIsMobile] = useState(false);
  const { fadeInVariants, cardVariants } = useAnimationVariants(false);
  const { fadeInVariants: mobileFadeIn, cardVariants: mobileCardVariants } = useAnimationVariants(true);
  const viewportSettings = getViewportSettings(isMobile);
  const { openModal } = useModal();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentCardVariants = isMobile ? mobileCardVariants : cardVariants;
  const currentFadeIn = isMobile ? mobileFadeIn : fadeInVariants;

  const commissionTiers = [
    { range: 'До 300 000 ₽', percent: '10%' },
    { range: 'От 300 000 ₽ до 1 000 000 ₽', percent: '7%' },
    { range: 'От 1 000 000 ₽ до 1 500 000 ₽', percent: '5%' },
    { range: 'Свыше 1 500 000 ₽', percent: 'по договорённости' },
  ];

  const additionalServices = [
    {
      title: 'Поиск фабрики по запросу',
      options: [
        { text: '5 000 ₽ — без передачи контактов', note: '(при оформлении заказа через нас сумма вычитается)' },
        { text: '8 000 ₽ — с передачей контактов' },
      ],
      icon: FaSearch,
    },
    {
      title: 'Брендирование / производство под ключ',
      options: [
        { text: 'от 3 000 ₽ до 7 000 ₽', note: '(в зависимости от объёма и задач)' },
      ],
      icon: FaPaintBrush,
    },
    {
      title: 'Заказ образца',
      options: [
        { text: '1 000 ₽ / шт + стоимость самого образца' },
      ],
      icon: FaBox,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 monochrome:from-mono-light monochrome:to-white blue:from-blue-light blue:to-white transition-colors overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={currentFadeIn}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 monochrome:from-mono-primary monochrome:to-mono-dark blue:from-blue-primary blue:to-blue-600 rounded-full mb-4 sm:mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaRubleSign className="text-2xl sm:text-3xl text-white" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
            Тарифы и условия
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 max-w-3xl mx-auto">
            Прозрачное ценообразование без скрытых платежей
          </p>
        </motion.div>

        {/* Минимальный заказ */}
        <motion.div
          className="mb-8 sm:mb-12"
          variants={currentFadeIn}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          <div className="bg-purple-primary dark:bg-purple-600 monochrome:bg-mono-primary blue:bg-blue-primary rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FaHandshake className="text-2xl sm:text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
                  МИНИМАЛЬНЫЙ ЗАКАЗ 30 000 ₽
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  До 30 000 ₽ есть услуга «совместные закупки» (от 5 000 ₽)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Комиссия компании */}
          <motion.div
            variants={currentCardVariants(0)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white rounded-2xl p-6 sm:p-8 shadow-lg dark:border dark:border-gray-700 h-full hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 monochrome:from-mono-primary monochrome:to-mono-dark blue:from-blue-primary blue:to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaPercent className="text-xl sm:text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-dark">
                  КОМИССИЯ КОМПАНИИ
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {commissionTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 monochrome:from-gray-100 monochrome:to-gray-200 blue:from-blue-50 blue:to-blue-100 border-l-4 border-transparent hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 monochrome:text-gray-dark blue:text-gray-700 font-medium flex-1">
                      {tier.range}
                    </span>
                    <span className={`font-bold text-purple-primary dark:text-purple-400 monochrome:text-mono-primary blue:text-blue-primary ${
                      tier.percent === 'по договорённости' 
                        ? 'text-sm sm:text-base md:text-lg' 
                        : 'text-lg sm:text-xl md:text-2xl'
                    }`}>
                      {tier.percent}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Дополнительные услуги */}
          <motion.div
            variants={currentCardVariants(1)}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <div className="bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white rounded-2xl p-6 sm:p-8 shadow-lg dark:border dark:border-gray-700 h-full hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 monochrome:from-mono-primary monochrome:to-mono-dark blue:from-blue-primary blue:to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaBox className="text-xl sm:text-2xl text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-dark">
                  ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {additionalServices.map((service, index) => {
                  return (
                    <div
                      key={index}
                      className="pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pb-0"
                    >
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-dark mb-2 sm:mb-3">
                        {service.title}
                      </h4>
                      <div className="space-y-1.5 sm:space-y-2">
                        {service.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-start gap-2">
                            <span className="text-purple-primary dark:text-purple-400 monochrome:text-mono-primary blue:text-blue-primary mt-0.5 flex-shrink-0">•</span>
                            <div>
                              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 monochrome:text-gray-dark blue:text-gray-700">
                                {option.text}
                              </p>
                              {option.note && (
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-500 mt-0.5">
                                  {option.note}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Индивидуальные условия */}
        <motion.div
          variants={currentCardVariants(2)}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 monochrome:from-mono-light monochrome:via-gray-100 monochrome:to-mono-light blue:from-blue-50 blue:via-blue-100 blue:to-blue-50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-purple-200 dark:border-purple-700 monochrome:border-mono-primary blue:border-blue-300 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 monochrome:from-mono-primary monochrome:to-mono-dark blue:from-blue-primary blue:to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <FaHeart className="text-2xl sm:text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-dark">
                  ИНДИВИДУАЛЬНЫЕ УСЛОВИЯ
                </h3>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-200 monochrome:text-gray-dark blue:text-gray-700">
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-purple-500 dark:text-purple-400 monochrome:text-mono-primary blue:text-blue-primary mt-1 flex-shrink-0" />
                    <p>
                      <strong>Крупные или регулярные заказы</strong> — обсуждаются персонально.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheck className="text-purple-500 dark:text-purple-400 monochrome:text-mono-primary blue:text-blue-primary mt-1 flex-shrink-0" />
                    <p>
                      <strong>Возможность заключения долгосрочного договора</strong> на скидочной или тарифной основе.
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={openModal}
                  className="mt-6 sm:mt-8 button-gradient px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 sm:gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Обсудить условия</span>
                  <FaHandshake className="text-lg" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


