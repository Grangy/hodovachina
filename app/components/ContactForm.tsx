'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa';
import { CityData } from '../data/cities';

interface ContactFormProps {
  cityData?: CityData | null;
}

export default function ContactForm({ cityData }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
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
    if (formData.whatsapp.trim() && formData.whatsapp.replace(/\D/g, '').length < 11) {
      errors.whatsapp = 'Введите корректный номер WhatsApp';
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
    
    const message = `Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nWhatsApp: ${formData.whatsapp || 'Не указан'}\nКомментарий: ${formData.comment || 'Нет комментария'}`;
    
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          type: 'contact',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', phone: '', whatsapp: '', comment: '' });
      setFormErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isMobileState, setIsMobileState] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="contact-form" className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-purple-light dark:bg-gray-800 monochrome:bg-mono-light blue:bg-blue-light transition-colors overflow-hidden w-full">
      <div className="max-w-6xl mx-auto w-full overflow-hidden">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors px-2"
          initial={{ opacity: isMobileState ? 1 : 0, y: isMobileState ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobileState ? 0 : 0.6 }}
        >
          {cityData 
            ? `Оставьте заявку — и мы рассчитаем вашу поставку из Китая в ${cityData.name}`
            : 'Оставьте заявку — и мы рассчитаем вашу поставку из Китая'}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 monochrome:bg-white blue:bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg dark:border dark:border-gray-700 transition-colors"
            initial={{ opacity: isMobileState ? 1 : 0, x: isMobileState ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobileState ? 0 : 0.6, delay: isMobileState ? 0 : 0.2 }}
          >
          <div className="space-y-6">
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
              <label htmlFor="whatsapp" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setFormData({ ...formData, whatsapp: formatted });
                  if (formErrors.whatsapp) setFormErrors({ ...formErrors, whatsapp: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark ${
                  formErrors.whatsapp ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-purple-primary transition-all`}
                placeholder="+7 (999) 999-99-99"
              />
              {formErrors.whatsapp && <p className="text-red-500 text-sm mt-1">{formErrors.whatsapp}</p>}
            </div>

            <div>
              <label htmlFor="comment" className="block mb-2 font-semibold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">
                Комментарий / запрос
              </label>
              <textarea
                id="comment"
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 monochrome:bg-white blue:bg-white dark:text-white monochrome:text-gray-dark blue:text-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-primary blue:focus:ring-blue-primary transition-all resize-none"
                placeholder="Опишите ваш запрос или укажите ссылки на товары"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black dark:bg-purple-primary monochrome:bg-mono-primary monochrome:hover:bg-mono-dark hover:bg-gray-dark dark:hover:bg-purple-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 active:scale-95"
            >
              {isSubmitting ? 'Отправка...' : 'Получить расчёт'}
            </button>
          </div>

          {/* Контакты внутри формы */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-lg font-semibold mb-4 text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark text-center">
              Свяжитесь с нами:
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href={`https://wa.me/${(cityData?.whatsapp || '+79991234567').replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 blue:text-gray-700 hover:text-purple-primary dark:hover:text-purple-primary blue:hover:text-blue-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FaWhatsapp className="text-2xl" />
                <span className="font-semibold">WhatsApp</span>
                {cityData && <span className="text-xs text-gray-500">({cityData.name})</span>}
              </motion.a>
              <motion.a
                href={cityData?.telegramLink || 'https://t.me/hodovachina'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 blue:text-gray-700 hover:text-purple-primary dark:hover:text-purple-primary blue:hover:text-blue-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FaTelegram className="text-2xl" />
                <span className="font-semibold">Telegram</span>
                {cityData && <span className="text-xs text-gray-500">({cityData.name})</span>}
              </motion.a>
              <motion.a
                href={`https://instagram.com/${cityData?.instagram || 'hodovachina'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 blue:text-gray-700 hover:text-purple-primary dark:hover:text-purple-primary blue:hover:text-blue-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FaInstagram className="text-2xl" />
                <span className="font-semibold">Instagram</span>
                {cityData && <span className="text-xs text-gray-500">({cityData.name})</span>}
              </motion.a>
            </div>
          </div>
        </motion.form>

        {/* Image */}
        <motion.div
          className="relative w-full h-64 sm:h-80 lg:h-96"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/contact.png"
            alt="Контакты"
            fill
            className="object-contain"
          />
        </motion.div>
        </div>
      </div>
    </section>
  );
}

