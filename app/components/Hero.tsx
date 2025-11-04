'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CityData } from '../data/cities';

interface HeroProps {
  cityData?: CityData | null;
}

type AnimationType = 'flip' | 'scale' | 'blur' | 'wave';

export default function Hero({ cityData }: HeroProps = {}) {
  const [showFlag, setShowFlag] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [animationType, setAnimationType] = useState<AnimationType>('flip');
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Улучшение #7: Статистика переключений (можно использовать для аналитики)
  // const [transitionCount, setTransitionCount] = useState(0); // Закомментировано для устранения warning

  // Улучшение #11: Разные типы анимаций
  const animationTypes = useRef<AnimationType[]>(['flip', 'scale', 'blur', 'wave']).current;
  
  // Позиции частиц для эффекта (улучшение #4)
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number }>>([]);
  
  // Улучшение #8: Адаптивная скорость для мобильных
  const getDisplayDuration = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 2500 : 2800;
    }
    return 2800;
  };

  const switchToFlag = useCallback(() => {
    setIsAnimating(true);
    setShowFlag(true);
    // setTransitionCount(prev => prev + 1); // Для аналитики, если нужно
    
    // Улучшение #11: Рандомный выбор типа анимации
    const randomType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
    setAnimationType(randomType);
    
    // Улучшение #4: Генерируем позиции для частиц
    setParticlePositions(Array.from({ length: 5 }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
    })));
    
    setTimeout(() => setIsAnimating(false), 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // animationTypes из useRef - стабильная ссылка, не требует зависимости

  const switchToText = useCallback(() => {
      setIsAnimating(true);
        setShowFlag(false);
    // setTransitionCount(prev => prev + 1); // Для аналитики, если нужно
    
    // Улучшение #4: Генерируем позиции для частиц
    setParticlePositions(Array.from({ length: 5 }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
    })));
    
    setTimeout(() => setIsAnimating(false), 600);
  }, []);

  // Улучшение #3: Интерактивность - ручное переключение
  const handleToggle = useCallback(() => {
    if (isAnimating) return;
    setClickCount(prev => prev + 1);
    if (showFlag) {
      switchToText();
    } else {
      switchToFlag();
    }
    // Временно останавливаем автоцикл
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 4000);
  }, [showFlag, isAnimating, switchToFlag, switchToText]);

  // Улучшение #10: Микро-интерактивность - реакция на движение мыши
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const DISPLAY_DURATION = getDisplayDuration();

    const startCycle = () => {
      timeoutRef.current = setTimeout(() => {
        switchToText();
        
        timeoutRef.current = setTimeout(() => {
          switchToFlag();
          intervalRef.current = setTimeout(() => {
            startCycle();
          }, DISPLAY_DURATION);
        }, DISPLAY_DURATION);
      }, DISPLAY_DURATION);
    };

    const timeoutId = setTimeout(() => {
      switchToFlag();
      intervalRef.current = setTimeout(() => {
        startCycle();
      }, DISPLAY_DURATION);
    }, DISPLAY_DURATION);

    return () => {
      clearTimeout(timeoutId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPaused, switchToFlag, switchToText]);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const whatsappNumber = cityData?.whatsapp || '+79288440555';
    window.open(`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`, '_blank');
  };

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
      {/* Фоновая подложка на весь блок */}
      <div className="absolute inset-0 top-12 sm:top-16 md:top-20 lg:top-24 bottom-2 sm:bottom-4 bg-purple-primary dark:bg-gray-800 blue:bg-blue-primary monochrome:bg-mono-hero rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 transition-colors"></div>
      
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-white monochrome:text-gray-dark"
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-center lg:text-left flex flex-wrap items-center justify-center lg:justify-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span>Оптовые поставки из</span>
              <div 
                ref={containerRef}
                className="relative inline-flex items-center justify-center h-9 sm:h-[1.2em] w-[70px] sm:w-auto sm:min-w-[80px] cursor-pointer group overflow-hidden"
                onClick={handleToggle}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                title="Кликните для переключения"
                style={{ verticalAlign: 'baseline' }}
              >
                {/* Улучшение #12: Визуальная подсказка о клике (появляется только на десктопе) */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 hidden lg:block pointer-events-none"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: clickCount === 0 ? [0.5, 1, 0.5] : 0, y: clickCount === 0 ? [-5, 0, -5] : -5 }}
                  transition={{ duration: 2, repeat: clickCount === 0 ? Infinity : 0 }}
                >
                  <span className="text-xs text-white/60 whitespace-nowrap">✨ Нажмите</span>
                </motion.div>
                {/* Улучшение #4: Эффект частиц при переключении */}
                {isAnimating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {particlePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                          x: '50%', 
                          y: '50%',
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: `calc(50% + ${pos.x}px)`,
                          y: `calc(50% + ${pos.y}px)`,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: i * 0.1,
                          ease: 'easeOut'
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Улучшение #5: Градиентная волна при переключении */}
                {isAnimating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                         style={{ transform: 'translateX(-100%)' }} />
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {!showFlag ? (
                    <motion.span
                      key="text"
                      initial={{ 
                        opacity: 1,
                        filter: 'blur(0px)',
                        rotateX: 0,
                        scale: 1
                      }}
                      animate={{ 
                        opacity: 1,
                        filter: 'blur(0px)',
                        rotateX: 0,
                        scale: 1,
                        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? mousePosition.x * 0.02 : 0,
                        y: typeof window !== 'undefined' && window.innerWidth >= 768 ? mousePosition.y * 0.02 : 0
                      }}
                      exit={{ 
                        opacity: 0,
                        filter: animationType === 'blur' ? 'blur(10px)' : 'blur(0px)',
                        rotateX: animationType === 'flip' ? 90 : 0,
                        rotateY: animationType === 'flip' ? -90 : 0,
                        scale: animationType === 'scale' ? 0.5 : 1,
                        y: animationType === 'wave' && typeof window !== 'undefined' && window.innerWidth >= 768 ? -20 : 0
                      }}
                      transition={{ 
                        duration: animationType === 'wave' ? 0.5 : 0.6,
                        ease: animationType === 'scale' ? [0.68, -0.55, 0.265, 1.55] : [0.4, 0, 0.2, 1],
                        filter: { duration: 0.3 }
                      }}
                      className="inline-flex items-center justify-center whitespace-nowrap relative z-0 h-full"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                        lineHeight: '1'
                      }}
                    >
                      Китая
                    </motion.span>
                  ) : (
                    <motion.span
                      key="flag"
                      initial={{ 
                        opacity: 0,
                        filter: animationType === 'blur' ? 'blur(10px)' : 'blur(0px)',
                        rotateX: animationType === 'flip' ? -90 : 0,
                        rotateY: animationType === 'flip' ? 90 : 0,
                        scale: animationType === 'scale' ? 0.5 : 1,
                        y: animationType === 'wave' && typeof window !== 'undefined' && window.innerWidth >= 768 ? 20 : 0
                      }}
                      animate={{ 
                        opacity: 1,
                        filter: 'blur(0px)',
                        rotateX: 0,
                        rotateY: 0,
                        scale: [0.8, 1.1, 1],
                        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? mousePosition.x * 0.03 : 0,
                        y: typeof window !== 'undefined' && window.innerWidth >= 768 ? mousePosition.y * 0.03 : 0
                      }}
                      exit={{ 
                        opacity: 0,
                        filter: animationType === 'blur' ? 'blur(10px)' : 'blur(0px)',
                        rotateX: animationType === 'flip' ? 90 : 0,
                        scale: animationType === 'scale' ? 0.5 : 1
                      }}
                      transition={{ 
                        duration: animationType === 'wave' ? 0.5 : 0.6,
                        ease: animationType === 'scale' ? [0.68, -0.55, 0.265, 1.55] : [0.4, 0, 0.2, 1],
                        filter: { duration: 0.3 },
                        scale: { 
                          times: [0, 0.5, 1],
                          duration: 0.6
                        }
                      }}
                      className="inline-flex items-center justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl relative z-0 h-full"
                      style={{ 
                        lineHeight: '1',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                      whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.2 : 1, rotate: typeof window !== 'undefined' && window.innerWidth >= 768 ? [0, -5, 5, -5, 0] : 0 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="relative z-10">🇨🇳</span>
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Улучшение #9: Blur эффект при переходе */}
                {isAnimating && animationType === 'blur' && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ backdropFilter: 'blur(0px)' }}
                    animate={{ backdropFilter: ['blur(0px)', 'blur(5px)', 'blur(0px)'] }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </div>
              <span>под ключ</span>
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/90 monochrome:text-mono-dark mb-4 sm:mb-6 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {cityData 
                ? `Доставка в ${cityData.name} — от 5 000 ₽ до крупных оптовых поставок`
                : 'От 5 000 ₽ до крупных оптовых поставок'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.button
                onClick={scrollToForm}
                className="bg-white dark:bg-gray-700 monochrome:bg-mono-primary monochrome:text-white text-black dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 monochrome:hover:bg-mono-dark w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Оставить заявку на расчёт поставки
              </motion.button>
              <motion.button
                onClick={openWhatsApp}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white monochrome:bg-white monochrome:hover:bg-gray-100 monochrome:text-gray-dark monochrome:border-gray-300 monochrome:hover:border-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Получить консультацию в WhatsApp
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
              <Image
                src="/images/man.png"
                alt="Персонаж с логистикой"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

