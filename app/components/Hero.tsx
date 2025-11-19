/**
 * Hero refresh highlights:
 * 1. Silver-inspired gradient background with subtle noise overlay.
 * 2. Reduced visual density: concise copy, minimal badges, and a compact CTA block.
 * 3. Fully visible illustration with object-contain behaviour and responsive padding.
 * 4. Motion that respects the user’s reduced-motion preference.
 * 5. Sanitised WhatsApp link via memoisation and scroll helper to the form.
 */
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CityData } from '../data/cities';
import { useModal } from './ModalProvider';

interface HeroProps {
  cityData?: CityData | null;
}

export default function Hero({ cityData }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useModal();

  const whatsappSanitised = useMemo(() => {
    const fallback = '+79288440555';
    const phone = cityData?.whatsapp ?? fallback;
    return phone.replace(/[^\d]/g, '');
  }, [cityData?.whatsapp]);

  const features = useMemo(
    () => [
      {
        title: 'Выкупаем оборудование, технику, производственные линии',
        description: 'Оптовые поставки с фабрик. Проверенные производители, лучшие условия по цене и срокам.'
      },
      {
        title: 'Выкуп с китайских площадок',
        description: '1688, Taobao, Alibaba и другие сервисы. Проверяем продавца и качество перед оплатой.'
      },
      {
        title: 'Производство под заказ',
        description: 'Под ваш бренд, с контролем качества на производстве и фотоотчётами каждого этапа.'
      },
      {
        title: 'Брендирование продукции',
        description: 'Логотип, упаковка и индивидуальный дизайн под вашу аудиторию.'
      },
      {
        title: 'Доставка и таможенное оформление',
        description: '«Белый ввоз», официальные документы и прозрачная логистика без скрытых платежей. Мы не только делаем белый ввоз, серый у нас тоже есть.'
      },
      {
        title: 'Совместные закупки от 5 000 ₽',
        description: 'Для небольших партий объединяем заказы и доставляем по выгодным ставкам.'
      }
    ],
    []
  );

  const [featureIndex, setFeatureIndex] = useState(0);
  const [hasAttention, setHasAttention] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  const handleAttentionStart = useCallback(() => setHasAttention(true), []);
  const handleAttentionEnd = useCallback(() => setHasAttention(false), []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || event.pointerType !== 'mouse') return;
      const { currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      setTilt({ x, y });
    },
    [shouldReduceMotion]
  );

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsPointerActive(false);
  }, []);

  useEffect(() => {
    if (features.length <= 1 || hasAttention) return;
    const interval = window.setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [features.length, hasAttention]);

  const activeFeature = features[featureIndex];

  const fadeProps = useCallback(
    (delay = 0) => {
      if (shouldReduceMotion) {
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          transition: { duration: 0 },
        } as const;
      }

      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
      } as const;
    },
    [shouldReduceMotion]
  );

  const scrollToForm = useCallback(() => {
    openModal();
  }, [openModal]);

  const openWhatsApp = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.open(`https://wa.me/${whatsappSanitised}`, '_blank', 'noopener');
  }, [whatsappSanitised]);

  const imageMotion = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 } };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#f1f2f6] via-[#e7e9ef] to-[#d8dce5] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff4d_0%,#ffffff00_60%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=128 height=128 viewBox=\'0 0 128 128\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 128h128V0H0z\' fill=\'%23ffffff\' opacity=\'0.05\'/%3E%3C/svg%3E')]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
        <motion.div {...fadeProps(0)} className="flex flex-col gap-8 text-center text-slate-900 sm:text-left">
          <div
            className="self-center rounded-3xl border border-slate-200/60 bg-white/80 px-5 py-4 text-left shadow-sm sm:self-start sm:max-w-md"
            onMouseEnter={handleAttentionStart}
            onMouseLeave={handleAttentionEnd}
            onFocus={handleAttentionStart}
            onBlur={handleAttentionEnd}
            onPointerDown={handleAttentionStart}
            onPointerUp={handleAttentionEnd}
            onPointerCancel={handleAttentionEnd}
            onPointerLeave={handleAttentionEnd}
            tabIndex={0}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Наши услуги</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">{activeFeature.title}</h2>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">{activeFeature.description}</p>
            </div>

          <div className="space-y-6">
            <h1
               id="hero-heading"
               className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-slate-900 sm:text-4xl md:text-5xl"
             >
              Поставки из Китая под ключ{cityData?.name ? ` в ${cityData.name}` : ''}
             </h1>
            <p className="mx-auto max-w-xl text-base text-slate-600 sm:mx-0 sm:text-lg">
              Организуем поиск производителей, проверку качества, страхование и доставку до вашего склада.
              {cityData?.name ? ` Доставляем в ${cityData.name} по прозрачно рассчитанным срокам и ставкам.` : ' Сосредоточьтесь на продажах, пока мы берём на себя всю логистику.'}
            </p>
          </div>

                  <motion.div
            {...fadeProps(0.15)}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#e4e8ef] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:w-auto sm:text-base"
            >
              Рассчитать поставку
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:w-auto sm:text-base"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Написать в WhatsApp
            </button>
          </motion.div>
            </motion.div>

        <motion.div {...imageMotion} className="relative mx-auto w-full max-w-[260px] sm:max-w-sm lg:max-w-lg">
          {/* Illustration enhancements:
              1. Прозрачный контейнер без подложки с двойным контуром.
              2. Анимированное световое кольцо-хало вокруг карточки.
              3. Динамический пунктирный орбитальный контур.
              4. Реакция на движение курсора с лёгким 3D-наклоном.
              5. Учёт предпочтений reduced-motion для отказа от анимаций.
              6. Адаптивное соотношение сторон и размеры под мобильные.
              7. Внутренний мягкий градиент Grid, создающий глубину без фона.
              8. Парящая плашка «Контроль качества» с качающейся анимацией.
              9. Карточка 24/7 с вертикальным плаванием.
              10. Световые бликов в виде SVG-искр.
              11. Отзывчивый скейл при нажатии/тапе.
              12. Оптимизированные внутренние отступы изображения для mobile.
           */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="pointer-events-none absolute inset-[-16%] rounded-[3rem] border border-slate-200/40"
              animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.65, 0.4], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute inset-[-26%] rounded-[3.75rem] border border-slate-200/30 border-dashed"
              animate={shouldReduceMotion ? undefined : { rotate: [0, 6, -6, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <motion.div
            className="relative aspect-[5/6] sm:aspect-[4/5] w-full overflow-visible rounded-[2rem]"
            style={{ transformStyle: 'preserve-3d' }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            onPointerUp={resetTilt}
            onPointerDown={() => setIsPointerActive(true)}
            animate={shouldReduceMotion ? undefined : { rotateX: tilt.y, rotateY: -tilt.x, scale: isPointerActive ? 0.97 : 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 12, mass: 0.7 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] border border-slate-200/50" />
            <motion.div
              className="pointer-events-none absolute inset-[-6%] rounded-[2.75rem] bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),rgba(255,255,255,0))]"
              animate={shouldReduceMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute left-4 top-6 h-12 w-12 text-slate-300/70 sm:left-6 sm:top-6 sm:h-14 sm:w-14"
              animate={shouldReduceMotion ? undefined : { rotate: [0, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.path
                d="M60 0 L66 38 L104 40 L72 62 L84 100 L60 78 L36 100 L48 62 L16 40 L54 38 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
            </motion.svg>

              <Image
                src="/images/main1.png"
                alt="Команда логистов рядом с коробками"
                fill
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 45vw, 480px"
                className="object-contain p-5 sm:p-8"
                priority
              />

            {!shouldReduceMotion && (
              <>
                <motion.div
                  className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-slate-200/50 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-600 shadow-sm sm:left-5 sm:top-5 sm:text-xs"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Контроль качества
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute bottom-4 left-1/2 flex min-w-[150px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/80 px-3 py-2 text-[11px] text-slate-600 shadow-lg sm:bottom-6 sm:min-w-[160px] sm:px-4 sm:py-3 sm:text-xs"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white sm:h-8 sm:w-8">24/7</span>
                  <div className="flex-1 leading-tight">Отправляем фото и видеоотчёты с фабрики</div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

