import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Hodova China',
  description: 'Политика конфиденциальности и обработки персональных данных компании Hodova China',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Политика конфиденциальности | Hodova China',
    description: 'Политика конфиденциальности и обработки персональных данных',
    url: `${BASE_URL}/privacy`,
    siteName: 'Hodova China',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Политика конфиденциальности | Hodova China',
    description: 'Политика конфиденциальности и обработки персональных данных',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-purple-primary hover:underline mb-8"
        >
          ← Вернуться на главную
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей веб-сайта hodovachina (далее — «Сайт»).
            </p>
            <p>
              Используя Сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              2. Персональные данные
            </h2>
            <p>
              Под персональными данными понимается любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
            </p>
            <p>
              Мы собираем следующие персональные данные:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Имя</li>
              <li>Номер телефона</li>
              <li>Дополнительная информация, предоставленная вами при заполнении форм на Сайте</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              3. Цели обработки персональных данных
            </h2>
            <p>
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка заявок и обращений пользователей</li>
              <li>Связь с пользователями для предоставления информации об услугах</li>
              <li>Улучшение качества обслуживания</li>
              <li>Соблюдение требований законодательства</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              4. Способы обработки персональных данных
            </h2>
            <p>
              Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таких средств.
            </p>
            <p>
              Мы принимаем необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              5. Сроки хранения персональных данных
            </h2>
            <p>
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, если иной срок не установлен законодательством.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              6. Права субъектов персональных данных
            </h2>
            <p>
              Вы имеете право:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получать информацию, касающуюся обработки ваших персональных данных</li>
              <li>Требовать уточнения персональных данных, их блокирования или уничтожения</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия или бездействие оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              7. Передача персональных данных третьим лицам
            </h2>
            <p>
              Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством или когда это необходимо для выполнения ваших запросов.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              8. Изменения в Политике конфиденциальности
            </h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              9. Контактная информация
            </h2>
            <p className="mb-4">
              По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами через форму обратной связи на Сайте или по контактным данным, указанным ниже.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Контактная информация</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>Индивидуальный предприниматель Ходова Анастасия Игоревна</strong></p>
                  <p>Адрес: Краснодарский край, г Новороссийск, ул Мира, д 1</p>
                  <p>Телефон: <a href="tel:+79288440555" className="text-purple-primary hover:underline">+7 (928) 844-05-55</a></p>
                  <p>Электронная почта: <a href="mailto:hodovachina@yandex.ru" className="text-purple-primary hover:underline">hodovachina@yandex.ru</a></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Реквизиты</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>Наименование организации: Индивидуальный предприниматель Ходова Анастасия Игоревна</p>
                  <p>ИНН: 1516 0428 2160</p>
                  <p>ОГРН: 32515 00000 43863</p>
                  <p>Название банка: ООО "Банк Точка"</p>
                  <p>Расчётный счёт: 4080 2810 0200 0076 5842</p>
                  <p>Корр. счёт: 3010 1810 7453 7452 5104</p>
                  <p>БИК: 044 525 104</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

