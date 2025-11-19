'use client';

import Image from 'next/image';
import { FaBox, FaFileAlt, FaRocket, FaGlobe } from 'react-icons/fa';
import { CityData } from '../data/cities';
import { useModal } from './ModalProvider';

interface FooterProps {
  cityData?: CityData | null;
}

export default function Footer({ cityData }: FooterProps = {}) {
  const logoSrc = '/logo_black.png';
  const { openModal } = useModal();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Блок доверия */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-slate-800">
              <FaBox />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">Работаем официально</h4>
              <p className="text-xs sm:text-sm text-slate-600">Предоставляем договор</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-slate-800">
              <FaFileAlt />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">Все документы</h4>
              <p className="text-xs sm:text-sm text-slate-600">Для таможни и бухгалтерии</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-slate-800">
              <FaRocket />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">Ежедневные отправки</h4>
              <p className="text-xs sm:text-sm text-slate-600">Из Китая</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="text-3xl text-slate-800">
              <FaGlobe />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">
                {cityData ? `Работаем в ${cityData.name}` : 'Клиенты по всей России'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {cityData ? 'Доставка в ваш город' : 'И СНГ'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-200">
          <div className="h-24 flex items-center">
            <Image
              src={logoSrc}
              alt="hodovachina"
              width={320}
              height={128}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex gap-6">
            <button
              onClick={openModal}
              className="button-gradient px-8 py-3"
            >
              Оставить заявку
            </button>
          </div>
        </div>
        {/* Реквизиты */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-3">Контактная информация</h3>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                <p><strong>ИП Ходова Анастасия Игоревна</strong></p>
                <p>Адрес: Краснодарский край, г Новороссийск, ул Мира, д 1</p>
                <p>Телефон: <a href="tel:+79288440555" className="hover:text-slate-900">+7 (928) 844-05-55</a></p>
                <p>Email: <a href="mailto:hodovachina@yandex.ru" className="hover:text-slate-900">hodovachina@yandex.ru</a></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-3">Реквизиты</h3>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                <p>ИНН: 1516 0428 2160</p>
                <p>ОГРН: 32515 00000 43863</p>
                <p>Банк: ООО "Банк Точка"</p>
                <p>Р/С: 4080 2810 0200 0076 5842</p>
                <p>К/С: 3010 1810 7453 7452 5104</p>
                <p>БИК: 044 525 104</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} ИП Ходова Анастасия Игоревна. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

