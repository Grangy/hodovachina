'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAnimationVariants, getViewportSettings } from '../utils/animations';
import { FaDownload, FaGraduationCap, FaUsers, FaUser } from 'react-icons/fa';

export default function TrainingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { fadeInVariants, cardVariants } = useAnimationVariants(false);
  const { fadeInVariants: mobileFadeIn, cardVariants: mobileCardVariants } = useAnimationVariants(true);
  const viewportSettings = getViewportSettings(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const downloadProgram = (type: 'group' | 'individual') => {
    const link = document.createElement('a');
    link.href = '/Hodova China.pdf.pdf';
    link.download = type === 'group' 
      ? 'Программа_группового_обучения_Hodova_China.pdf'
      : 'Программа_индивидуального_обучения_Hodova_China.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('training-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentCardVariants = isMobile ? mobileCardVariants : cardVariants;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 blue:bg-blue-light monochrome:bg-white transition-colors overflow-x-hidden w-full max-w-full">
      <div className="w-full max-w-full overflow-x-hidden">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-light to-white dark:from-gray-800 dark:to-gray-900 monochrome:from-mono-light monochrome:to-white blue:from-blue-light blue:to-white transition-colors overflow-hidden w-full">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              className="text-center mb-8 sm:mb-10 md:mb-12"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              <motion.div
                className="inline-block mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaGraduationCap className="text-4xl sm:text-5xl md:text-6xl text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
                Обучение работе с поставками из Китая
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Получите практические знания и опыт для успешной работы с поставками товаров из Китая. 
                Научитесь находить поставщиков, оформлять документы и организовывать логистику.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Training Options */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
          <div className="max-w-6xl mx-auto w-full">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              Форматы обучения
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {/* Group Training */}
              <motion.div
                className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
                variants={currentCardVariants(0)}
                initial="hidden"
                animate={isMobile ? "visible" : undefined}
                whileInView={isMobile ? undefined : "visible"}
                viewport={isMobile ? undefined : viewportSettings}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-purple-primary dark:bg-purple-primary monochrome:bg-mono-primary blue:bg-blue-primary rounded-full mb-4 sm:mb-6">
                    <FaUsers className="text-2xl sm:text-3xl text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
                    Групповое обучение
                  </h3>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary mb-2">
                    12 999 ₽
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600">
                    Экономичный вариант для тех, кто хочет получить базовые знания
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base text-gray-700 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Обучение в группе до 10 человек</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Практические кейсы и примеры</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Доступ к материалам и записям</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Ответы на вопросы в групповом чате</span>
                  </li>
                </ul>

                <div className="space-y-3 sm:space-y-4">
                  <motion.button
                    onClick={() => downloadProgram('group')}
                    className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[44px]"
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaDownload />
                    <span>Скачать программу группового обучения</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Individual Training */}
              <motion.div
                className="bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors border-2 border-purple-primary dark:border-purple-primary monochrome:border-mono-primary blue:border-blue-primary"
                variants={currentCardVariants(1)}
                initial="hidden"
                animate={isMobile ? "visible" : undefined}
                whileInView={isMobile ? undefined : "visible"}
                viewport={isMobile ? undefined : viewportSettings}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-purple-primary dark:bg-purple-primary monochrome:bg-mono-primary blue:bg-blue-primary rounded-full mb-4 sm:mb-6">
                    <FaUser className="text-2xl sm:text-3xl text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
                    Индивидуальное обучение
                  </h3>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary mb-2">
                    39 999 ₽
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-600">
                    Персональный подход для максимального результата
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base text-gray-700 dark:text-gray-300 monochrome:text-mono-dark blue:text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Индивидуальные занятия один на один</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Персональная программа под ваши задачи</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Разбор ваших конкретных кейсов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Поддержка после обучения</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>Гибкий график занятий</span>
                  </li>
                </ul>

                <div className="space-y-3 sm:space-y-4">
                  <motion.button
                    onClick={() => downloadProgram('individual')}
                    className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[44px]"
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaDownload />
                    <span>Скачать программу индивидуального обучения</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="text-center mt-10 sm:mt-12 md:mt-16"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              <motion.button
                onClick={scrollToForm}
                className="bg-purple-primary dark:bg-purple-primary monochrome:bg-mono-primary blue:bg-blue-primary hover:bg-purple-dark dark:hover:bg-purple-dark monochrome:hover:bg-mono-dark blue:hover:bg-blue-dark text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-lg text-base sm:text-lg md:text-xl font-semibold transition-all hover:scale-105 active:scale-95 min-h-[44px] inline-flex items-center gap-3"
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGraduationCap />
                <span>Записаться на обучение</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="training-form" className="py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
          <div className="max-w-4xl mx-auto w-full">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
              variants={isMobile ? mobileFadeIn : fadeInVariants}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              Записаться на обучение
            </motion.h2>

            <motion.div
              className="bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
              variants={currentCardVariants(0)}
              initial="hidden"
              animate={isMobile ? "visible" : undefined}
              whileInView={isMobile ? undefined : "visible"}
              viewport={isMobile ? undefined : viewportSettings}
            >
              <TrainingForm />
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

function TrainingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    trainingType: 'group',
    comment: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Введите имя';
    if (!formData.phone.trim()) errors.phone = 'Введите телефон';
    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 11) {
      errors.phone = 'Введите корректный номер телефона';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Введите корректный email';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const message = `Запись на обучение:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email || 'Не указан'}\nТип обучения: ${formData.trainingType === 'group' ? 'Групповое (12 999 ₽)' : 'Индивидуальное (39 999 ₽)'}\nКомментарий: ${formData.comment || 'Нет'}`;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(message);
    
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время для уточнения деталей.');
    setFormData({ name: '', phone: '', email: '', trainingType: 'group', comment: '' });
    setFormErrors({});
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
          }}
          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark ${
            formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all`}
          placeholder="Ваше имя"
        />
        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={handlePhoneChange}
          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark ${
            formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all`}
          placeholder="+7 (999) 999-99-99"
        />
        {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
          }}
          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark ${
            formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all`}
          placeholder="your@email.com"
        />
        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="trainingType" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
          Тип обучения *
        </label>
        <select
          id="trainingType"
          required
          value={formData.trainingType}
          onChange={(e) => setFormData({ ...formData, trainingType: e.target.value as 'group' | 'individual' })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all"
        >
          <option value="group">Групповое обучение - 12 999 ₽</option>
          <option value="individual">Индивидуальное обучение - 39 999 ₽</option>
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
          Комментарий или вопросы
        </label>
        <textarea
          id="comment"
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all resize-none"
          placeholder="Расскажите о ваших целях или задайте вопросы"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-all hover:scale-105 active:scale-95 min-h-[44px]"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку на обучение'}
      </button>
    </form>
  );
}

