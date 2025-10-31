'use client';

import { FaBox, FaFileAlt, FaRocket, FaGlobe } from 'react-icons/fa';
import { CityData } from '../data/cities';

interface FooterProps {
  cityData?: CityData | null;
}

export default function Footer({ cityData }: FooterProps = {}) {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 monochrome:bg-mono-light blue:bg-blue-light border-t border-gray-200 dark:border-gray-700 monochrome:border-gray-300 blue:border-gray-300 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Блок доверия */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary">
              <FaBox />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark mb-1">Работаем официально</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600">Предоставляем договор</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary">
              <FaFileAlt />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark mb-1">Все документы</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600">Для таможни и бухгалтерии</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary">
              <FaRocket />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark mb-1">Ежедневные отправки</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600">Из Китая</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-purple-primary dark:text-purple-primary monochrome:text-mono-primary blue:text-blue-primary">
              <FaGlobe />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark mb-1">
                {cityData ? `Работаем в ${cityData.name}` : 'Клиенты по всей России'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600">
                {cityData ? 'Доставка в ваш город' : 'И СНГ'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700 monochrome:border-gray-300 blue:border-gray-300">
          <div className="text-xl font-bold text-gray-dark dark:text-white monochrome:text-gray-dark blue:text-gray-dark transition-colors">hodovachina</div>
          <div className="flex gap-6">
            <button
              onClick={scrollToForm}
              className="bg-black dark:bg-purple-primary monochrome:bg-mono-primary hover:bg-gray-dark dark:hover:bg-purple-dark monochrome:hover:bg-mono-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 monochrome:border-gray-300 blue:border-gray-300 text-center text-sm text-gray-600 dark:text-gray-400 monochrome:text-mono-dark blue:text-gray-600 transition-colors">
          <p>© {new Date().getFullYear()} hodovachina. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

