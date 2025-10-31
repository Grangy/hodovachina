import { Variants, Easing } from 'framer-motion';

export const useAnimationVariants = (isMobile: boolean) => {
  // Очень мягкие easing функции для максимальной плавности
  const ultraSmoothEase: Easing = [0.16, 1, 0.3, 1] as const; // Еще более плавная кривая
  const smoothEase: Easing = [0.22, 1, 0.36, 1] as const; // Custom cubic-bezier для плавности
  const gentleEase: Easing = [0.43, 0.13, 0.23, 0.96] as const; // Мягкая кривая без резких изменений
  
  // Базовые варианты для заголовков - плавное появление
  const fadeInVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 10 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 1.0 : 0.8,
        ease: ultraSmoothEase,
      },
    },
  };

  // Варианты для карточек с красивым движением слева/справа на мобильных
  const cardVariants = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      x: isMobile ? (index % 2 === 0 ? -60 : 60) : 0,
      y: isMobile ? 0 : 40,
      scale: isMobile ? 0.92 : 0.95,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: isMobile ? 0.9 : 0.7,
        ease: ultraSmoothEase,
        delay: isMobile ? index * 0.1 : index * 0.12,
        opacity: { duration: isMobile ? 0.7 : 0.6 },
        filter: { duration: isMobile ? 0.5 : 0.4 },
      },
    },
  });

  // Варианты для элементов списка (шаги) - движение слева/справа на мобильных
  const listItemVariants = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      x: isMobile ? (index % 2 === 0 ? -50 : 50) : -40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.75 : 0.6,
        ease: gentleEase,
        delay: isMobile ? index * 0.12 : index * 0.18,
      },
    },
  });

  // Варианты для изображений - плавное масштабирование и появление
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: isMobile ? 1.0 : 0.8,
        ease: ultraSmoothEase,
        delay: 0.15,
        scale: {
          duration: isMobile ? 1.0 : 0.8,
          ease: smoothEase,
        },
        filter: {
          duration: isMobile ? 0.6 : 0.5,
        },
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
    ultraSmoothEase,
  };
};

// Viewport настройки для плавного запуска анимаций
export const getViewportSettings = (isMobile: boolean) => ({
  once: true,
  margin: isMobile ? '-50px' : '-100px', // Увеличил margin для мобильных, чтобы анимация начиналась раньше
  amount: isMobile ? 0.2 : 0.15, // Анимация запустится когда видно 20% элемента на мобильных
});

