'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from './ModalProvider';
import { useToast } from './ToastProvider';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

export default function RequestModal() {
  const { isOpen, closeModal } = useModal();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    privacyAccepted: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Улучшение 1: Автофокус на первое поле при открытии
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      // Небольшая задержка для плавной анимации
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Улучшение 2: Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);

  // Улучшение 3: Закрытие по клику вне модального окна
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  // Улучшение 4: Сохранение данных в localStorage
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('requestFormData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          // Игнорируем ошибки парсинга
        }
      }
    }
  }, [isOpen]);

  const saveToLocalStorage = useCallback((data: typeof formData) => {
    try {
      localStorage.setItem('requestFormData', JSON.stringify(data));
    } catch (e) {
      // Игнорируем ошибки localStorage
    }
  }, []);

  // Улучшение 5: Валидация в реальном времени
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Введите имя';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Введите телефон';
    } else if (formData.phone.replace(/\D/g, '').length < 11) {
      errors.phone = 'Введите корректный номер телефона';
    }
    if (!formData.privacyAccepted) {
      errors.privacyAccepted = 'Необходимо согласие с политикой конфиденциальности';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Улучшение 6: Автоматическое форматирование телефона
  const formatPhone = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    const newData = { ...formData, phone: formatted };
    setFormData(newData);
    saveToLocalStorage(newData);
    if (formErrors.phone) {
      setFormErrors({ ...formErrors, phone: '' });
    }
  }, [formData, formatPhone, formErrors, saveToLocalStorage]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, name: e.target.value };
    setFormData(newData);
    saveToLocalStorage(newData);
    if (formErrors.name) {
      setFormErrors({ ...formErrors, name: '' });
    }
  }, [formData, formErrors, saveToLocalStorage]);

  const handlePrivacyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, privacyAccepted: e.target.checked };
    setFormData(newData);
    saveToLocalStorage(newData);
    if (formErrors.privacyAccepted) {
      setFormErrors({ ...formErrors, privacyAccepted: '' });
    }
  }, [formData, formErrors, saveToLocalStorage]);

  // Улучшение 10: Защита от спама (debounce на кнопку отправки)
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < 2000) {
      showToast('Пожалуйста, подождите перед повторной отправкой', 'error');
      return;
    }

    if (!validateForm()) {
      showToast('Пожалуйста, заполните все поля корректно', 'error');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const message = `Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}`;

    // Улучшение 9: Аналитика отправки формы
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: 'request_modal'
      });
    }

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

      if (response.ok) {
        // Улучшение 12: Успешное сообщение после отправки
        showToast('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очистка формы и localStorage
        setFormData({ name: '', phone: '', privacyAccepted: false });
        localStorage.removeItem('requestFormData');
        setFormErrors({});
        
        // Улучшение 13: Автоматическое закрытие после успешной отправки
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, lastSubmitTime, showToast, closeModal]);

  // Улучшение 15: Поддержка клавиатурной навигации
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      const form = e.currentTarget.closest('form');
      if (form) {
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton && !isSubmitting) {
          submitButton.click();
        }
      }
    }
  }, [isSubmitting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onKeyDown={handleKeyDown}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
                aria-label="Закрыть"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h2
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white"
                >
                  Оставить заявку
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Имя *
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      id="modal-name"
                      required
                      value={formData.name}
                      onChange={handleNameChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 dark:text-white ${
                        formErrors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-purple-primary'
                      } focus:outline-none focus:ring-2 transition-all`}
                      placeholder="Ваше имя"
                      autoComplete="name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label
                      htmlFor="modal-phone"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 dark:text-white ${
                        formErrors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-purple-primary'
                      } focus:outline-none focus:ring-2 transition-all`}
                      placeholder="+7 (999) 999-99-99"
                      autoComplete="tel"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Privacy checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={handlePrivacyChange}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-primary focus:ring-purple-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Я согласен с{' '}
                        <Link
                          href="/privacy"
                          target="_blank"
                          className="text-purple-primary hover:underline font-semibold"
                          onClick={(e) => e.stopPropagation()}
                        >
                          политикой конфиденциальности
                        </Link>
                        {' '}*
                      </span>
                    </label>
                    {formErrors.privacyAccepted && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.privacyAccepted}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-gradient w-full px-8 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </span>
                    ) : (
                      'Отправить заявку'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

