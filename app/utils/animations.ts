import { Variants, Easing } from 'framer-motion';

export const useAnimationVariants = (isMobile: boolean) => {
  // Easing функции
  const smoothEase: Easing = [0.22, 1, 0.36, 1] as const;
  const gentleEase: Easing = [0.43, 0.13, 0.23, 0.96] as const;
  
  // НА МОБИЛЬНЫХ: Только простой fade-in без движения и сложных эффектов
  // НА ДЕСКТОПЕ: Полные анимации с движением
  
  // Базовые варианты для заголовков
  const fadeInVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 0 : 20, // На мобильных без движения
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8, // Быстрее на мобильных
        ease: 'easeOut',
      },
    },
  };

  // Варианты для карточек
  const cardVariants = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      // На мобильных только opacity, на десктопе добавляем движение и scale
      ...(isMobile ? {} : {
        y: 40,
        scale: 0.95,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        y: 0,
        scale: 1,
      }),
      transition: {
        duration: isMobile ? 0.4 : 0.7, // Быстрее на мобильных
        ease: 'easeOut',
        // Минимальная задержка на мобильных или без задержки
        delay: isMobile ? 0 : index * 0.12,
      },
    },
  });

  // Варианты для элементов списка
  const listItemVariants = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      // На мобильных только opacity
      ...(isMobile ? {} : {
        x: -40,
        scale: 0.96,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        x: 0,
        scale: 1,
      }),
      transition: {
        duration: isMobile ? 0.4 : 0.6, // Быстрее на мобильных
        ease: 'easeOut',
        // Без задержки на мобильных
        delay: isMobile ? 0 : index * 0.18,
      },
    },
  });

  // Варианты для изображений
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      // На мобильных только opacity
      ...(isMobile ? {} : {
        scale: 0.88,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        scale: 1,
      }),
      transition: {
        duration: isMobile ? 0.4 : 0.8, // Быстрее на мобильных
        ease: 'easeOut',
        delay: isMobile ? 0 : 0.15, // Без задержки на мобильных
      },
    },
  };

  return {
    fadeInVariants,
    cardVariants,
    listItemVariants,
    imageVariants,
    smoothEase,
    gentleEase,
  };
};

// Viewport настройки - НЕ блокируем скролл на мобильных
export const getViewportSettings = (isMobile: boolean) => ({
  once: true,
  // На мобильных положительный margin, чтобы не блокировать скролл
  margin: isMobile ? '100px' : '-100px',
  // На мобильных анимация запускается когда элемент полностью виден
  amount: isMobile ? 0.5 : 0.15,
});

