import { Variants, Easing } from 'framer-motion';

export const useAnimationVariants = (isMobile: boolean) => {
  // Easing функции
  const smoothEase: Easing = [0.22, 1, 0.36, 1] as const;
  const gentleEase: Easing = [0.43, 0.13, 0.23, 0.96] as const;
  
  // НА МОБИЛЬНЫХ: МГНОВЕННОЕ ПОЯВЛЕНИЕ БЕЗ АНИМАЦИЙ (duration: 0)
  // НА ДЕСКТОПЕ: Полные анимации с движением
  
  // Базовые варианты для заголовков
  const fadeInVariants: Variants = {
    hidden: { 
      opacity: isMobile ? 1 : 0, // На мобильных сразу видно
      y: isMobile ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0 : 0.8, // На мобильных мгновенно
        ease: 'easeOut',
      },
    },
  };

  // Варианты для карточек
  const cardVariants = (index: number): Variants => ({
    hidden: {
      opacity: isMobile ? 1 : 0, // На мобильных сразу видно
      ...(isMobile ? {} : {
        y: 30,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        y: 0,
      }),
      transition: {
        duration: isMobile ? 0 : 0.7, // На мобильных мгновенно
        ease: 'easeOut',
        delay: isMobile ? 0 : index * 0.12,
      },
    },
  });

  // Варианты для элементов списка
  const listItemVariants = (index: number): Variants => ({
    hidden: {
      opacity: isMobile ? 1 : 0, // На мобильных сразу видно
      ...(isMobile ? {} : {
        y: 20,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        y: 0,
      }),
      transition: {
        duration: isMobile ? 0 : 0.6, // На мобильных мгновенно
        ease: 'easeOut',
        delay: isMobile ? 0 : index * 0.18,
      },
    },
  });

  // Варианты для изображений
  const imageVariants: Variants = {
    hidden: {
      opacity: isMobile ? 1 : 0, // На мобильных сразу видно
      ...(isMobile ? {} : {
        y: 20,
      }),
    },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : {
        y: 0,
      }),
      transition: {
        duration: isMobile ? 0 : 0.8, // На мобильных мгновенно
        ease: 'easeOut',
        delay: isMobile ? 0 : 0.15,
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

// Viewport настройки - НА МОБИЛЬНЫХ ОТКЛЮЧАЕМ АНИМАЦИИ ПОЛНОСТЬЮ
export const getViewportSettings = (isMobile: boolean) => ({
  once: true,
  // На мобильных НЕ используем viewport - анимации отключены
  // На десктопе стандартные настройки
  ...(isMobile ? {} : {
    margin: '-100px',
    amount: 0.15,
  }),
});

