'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CityData } from '../data/cities';
import { useState, useEffect } from 'react';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';
import ImageSlider from './ImageSlider';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TestimonialsProps {
  cityData?: CityData | null;
}

interface Testimonial {
  name: string;
  company?: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Александр Петров',
    company: 'ООО "ТехноПром"',
    text: 'Работаем с командой уже полтора года. Заказали производственное оборудование для нашего цеха. Всё пришло в срок, качество отличное, документы в порядке. Особенно понравилось, что постоянно держали в курсе на каждом этапе - от производства до таможни. Рекомендую!',
    rating: 5,
  },
  {
    name: 'Мария Соколова',
    company: 'Интернет-магазин "Стиль"',
    text: 'Заказывали упаковку для нашего бренда. Сделали брендирование под наш логотип, всё идеально. Цена получилась намного ниже, чем у местных поставщиков. Доставили точно в срок, без задержек. Теперь заказываем регулярно, очень довольны сотрудничеством.',
    rating: 5,
  },
  {
    name: 'Дмитрий Иванов',
    company: 'ИП Иванов',
    text: 'Первый раз заказывал через совместную закупку - очень удобно для небольших партий. Заказал товар на 15 000 рублей, доставили быстро, всё пришло целым. Консультанты помогли выбрать оптимальный вариант доставки. Обязательно буду обращаться ещё.',
    rating: 5,
  },
  {
    name: 'Елена Кузнецова',
    company: 'ООО "Вендинг Сервис"',
    text: 'Закупили партию вендинговых аппаратов. Проверили качество на фабрике перед отправкой, прислали фото и видео. Оформление документов прошло без проблем, таможня тоже без задержек. Аппараты работают уже 8 месяцев без нареканий. Спасибо за профессионализм!',
    rating: 5,
  },
  {
    name: 'Сергей Волков',
    company: 'ООО "СтройМатериалы"',
    text: 'Нужны были специфические материалы для строительства. Нашли производителя в Китае, организовали производство под наши требования. Контроль качества на каждом этапе, фотоотчёты регулярно. Доставили в Москву точно в срок. Цена и качество - на высоте!',
    rating: 5,
  },
  {
    name: 'Анна Морозова',
    company: 'Магазин "Дом и Сад"',
    text: 'Заказываем товары для дома и сада уже третий раз. Всегда помогают найти лучших поставщиков, проверяют качество перед оплатой. Логистика отлажена отлично, документы всегда в порядке. Работают и с белой, и с серой схемой - подбирают оптимальный вариант.',
    rating: 5,
  },
];

// Массивы изображений для каждого блока
const vendingImages = [
  '/zakaz/vending_avtomati/IMG_2175.JPG',
  '/zakaz/vending_avtomati/IMG_2176.JPG',
  '/zakaz/vending_avtomati/IMG_2177.JPG',
  '/zakaz/vending_avtomati/IMG_2178.JPG',
  '/zakaz/vending_avtomati/IMG_2179.JPG',
  '/zakaz/vending_avtomati/IMG_2180.JPG',
  '/zakaz/vending_avtomati/IMG_2181.JPG',
  '/zakaz/vending_avtomati/IMG_2182.JPG',
  '/zakaz/vending_avtomati/IMG_2183.JPG',
  '/zakaz/vending_avtomati/IMG_2184.JPG',
  '/zakaz/vending_avtomati/IMG_2185.JPG',
  '/zakaz/vending_avtomati/IMG_2186.JPG',
  '/zakaz/vending_avtomati/IMG_2187.JPG',
  '/zakaz/vending_avtomati/IMG_2188.JPG',
  '/zakaz/vending_avtomati/IMG_2189.JPG',
  '/zakaz/vending_avtomati/IMG_2190.JPG',
];

const packagingImages = [
  '/zakaz/upak/IMG_1754.JPG',
  '/zakaz/upak/IMG_1755.JPG',
  '/zakaz/upak/IMG_1756.JPG',
  '/zakaz/upak/IMG_1758.JPG',
  '/zakaz/upak/IMG_1759.JPG',
  '/zakaz/upak/IMG_1760.JPG',
  '/zakaz/upak/IMG_1761.JPG',
  '/zakaz/upak/IMG_1762.JPG',
  '/zakaz/upak/IMG_1763.JPG',
  '/zakaz/upak/IMG_1764.JPG',
  '/zakaz/upak/IMG_1765.JPG',
  '/zakaz/upak/IMG_1766.JPG',
  '/zakaz/upak/IMG_1767.JPG',
  '/zakaz/upak/IMG_1768.JPG',
  '/zakaz/upak/IMG_1769.JPG',
  '/zakaz/upak/IMG_1770.JPG',
  '/zakaz/upak/IMG_1771.JPG',
  '/zakaz/upak/IMG_1772.JPG',
  '/zakaz/upak/IMG_1773.JPG',
  '/zakaz/upak/IMG_1774.JPG',
  '/zakaz/upak/IMG_1775.JPG',
  '/zakaz/upak/IMG_1776.JPG',
  '/zakaz/upak/IMG_1777.JPG',
  '/zakaz/upak/IMG_1778.JPG',
  '/zakaz/upak/IMG_1779.JPG',
  '/zakaz/upak/IMG_1780.JPG',
  '/zakaz/upak/IMG_1781.JPG',
  '/zakaz/upak/IMG_1782.JPG',
  '/zakaz/upak/IMG_1783.JPG',
  '/zakaz/upak/IMG_1785.JPG',
  '/zakaz/upak/IMG_1786.JPG',
  '/zakaz/upak/IMG_1788.JPG',
  '/zakaz/upak/IMG_1794.JPG',
  '/zakaz/upak/IMG_1795.JPG',
  '/zakaz/upak/IMG_1798.JPG',
];

const technicalImages = [
  '/zakaz/oborud_technic/def6edcb96fb9e837b6202412708ab0b.png',
  '/zakaz/oborud_technic/IMG_1789.JPG',
  '/zakaz/oborud_technic/IMG_1790.JPG',
  '/zakaz/oborud_technic/IMG_1791.JPG',
  '/zakaz/oborud_technic/IMG_1792.JPG',
  '/zakaz/oborud_technic/IMG_1793.JPG',
  '/zakaz/oborud_technic/IMG_1800.JPG',
  '/zakaz/oborud_technic/IMG_1801.JPG',
  '/zakaz/oborud_technic/IMG_1802.JPG',
  '/zakaz/oborud_technic/IMG_1803.JPG',
  '/zakaz/oborud_technic/IMG_1804.JPG',
];

export default function Testimonials({ cityData }: TestimonialsProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    if (isHovered || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const goToPrevious = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
  };

  const currentCardVariants = isMobile ? mobileCardVariants : cardVariants;
  const currentImageVariants = isMobile ? mobileImageVariants : imageVariants;
  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-hidden">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors"
          variants={isMobile ? mobileFadeIn : fadeInVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : viewportSettings}
        >
          {cityData 
            ? `Нам доверяют клиенты в ${cityData.namePrepositional || cityData.name}`
            : 'Нам доверяют сотни клиентов по всей России'}
        </motion.h2>

        {/* Слайдер отзывов */}
        <div 
          className="relative max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl dark:border dark:border-gray-700 shadow-lg"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 monochrome:text-mono-dark blue:text-gray-700 mb-6 leading-relaxed italic">
                  "{currentTestimonial.text}"
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white monochrome:text-gray-dark blue:text-gray-900 text-sm sm:text-base">
                      {currentTestimonial.name}
                    </p>
                    {currentTestimonial.company && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600">
                        {currentTestimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Навигация */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-700/90 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Предыдущий отзыв"
                >
                  <FaChevronLeft className="text-gray-800 dark:text-gray-200 text-sm sm:text-base" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-700/90 hover:bg-white dark:hover:bg-gray-600 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Следующий отзыв"
                >
                  <FaChevronRight className="text-gray-800 dark:text-gray-200 text-sm sm:text-base" />
                </button>
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentTestimonialIndex
                          ? 'bg-purple-primary dark:bg-purple-light monochrome:bg-mono-primary blue:bg-blue-primary w-8'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                      aria-label={`Перейти к отзыву ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="text-center mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {currentTestimonialIndex + 1} / {testimonials.length}
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Блоки с фотогалереями */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* Вендинговые аппараты */}
          <motion.div
            className="w-full"
            variants={currentImageVariants}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <ImageSlider
              images={vendingImages}
              title="Вендинговые аппараты"
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </motion.div>

          {/* Упаковка */}
          <motion.div
            className="w-full"
            variants={currentImageVariants}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <ImageSlider
              images={packagingImages}
              title="Упаковка"
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </motion.div>

          {/* Техническое оборудование */}
          <motion.div
            className="w-full"
            variants={currentImageVariants}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={isMobile ? undefined : "visible"}
            viewport={isMobile ? undefined : viewportSettings}
          >
            <ImageSlider
              images={technicalImages}
              title="Техническое оборудование"
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

