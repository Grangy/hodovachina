import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import CooperationFormats from './components/CooperationFormats';
import WorkSteps from './components/WorkSteps';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  title: "Оптовые поставки товаров из Китая под ключ | Доставка по России",
  description: "Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка по всей России.",
  keywords: [
    "оптовые поставки из Китая",
    "товары из Китая",
    "доставка из Китая",
    "растаможка товаров",
    "выкуп товаров",
    "производство в Китае",
    "брендирование товаров",
    "логистика из Китая",
    "совместные закупки",
    "оптовая торговля",
  ],
  authors: [{ name: "Hodova China" }],
  publisher: "Hodova China",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Оптовые поставки товаров из Китая под ключ | Доставка по России",
    description: "Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка по всей России.",
    url: BASE_URL,
    siteName: "Hodova China",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/main.png`,
        width: 1200,
        height: 630,
        alt: "Оптовые поставки товаров из Китая",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Оптовые поставки товаров из Китая под ключ | Доставка по России",
    description: "Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽.",
    images: [`${BASE_URL}/images/main.png`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ИП Ходова Анастасия Игоревна",
    "legalName": "Индивидуальный предприниматель Ходова Анастасия Игоревна",
    "url": baseUrl,
    "logo": `${baseUrl}/logo_black.png`,
    "description": "Оптовые поставки товаров из Китая под ключ. Выкуп, производство, брендирование, логистика и растаможка.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул Мира, д 1",
      "addressLocality": "Новороссийск",
      "addressRegion": "Краснодарский край",
      "addressCountry": "RU",
      "postalCode": "353900"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-928-844-05-55",
      "email": "hodovachina@yandex.ru",
      "contactType": "customer service",
      "availableLanguage": "Russian"
    },
    "sameAs": [
      "https://t.me/hodovachina",
      "https://www.instagram.com/hodova.china"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Оптовые поставки товаров из Китая",
    "provider": {
      "@type": "Organization",
      "name": "ИП Ходова Анастасия Игоревна",
      "legalName": "Индивидуальный предприниматель Ходова Анастасия Игоревна"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "price": "100000",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "100000",
        "priceCurrency": "RUB",
        "valueAddedTaxIncluded": true
      }
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Чем белая доставка отличается от карго?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Белая доставка — это официальный ввоз товаров с полным пакетом документов для налоговой и таможни. Все товары оформляются легально, с уплатой всех необходимых пошлин и налогов. Карго — это неофициальная доставка без полного документального оформления. Также мы предоставляем серую доставку — это промежуточный вариант между белой и карго, с частичным документальным оформлением и оптимизацией таможенных платежей."
        }
      },
      {
        "@type": "Question",
        "name": "Почему выгодно заказывать товар в Китае?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Заказ товаров в Китае выгоден благодаря низкой стоимости производства, широкому ассортименту, возможности производства под заказ и быстрому развитию инноваций. Мы помогаем минимизировать риски и организуем весь процесс под ключ."
        }
      },
      {
        "@type": "Question",
        "name": "Какие требования для оформления заказа?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы работаем с любыми клиентами, готовыми к сотрудничеству. Оплата производится в рублях по курсу на день оплаты. Никаких специальных требований нет."
        }
      },
      {
        "@type": "Question",
        "name": "Какой минимальный объём заказа?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Для индивидуальных поставок минимальная сумма заказа — от 500 000 ₽. Также мы организуем совместные закупки для мелких партий от 5 000 ₽, объединяя заказы нескольких клиентов."
        }
      },
      {
        "@type": "Question",
        "name": "Какие документы вы предоставляете?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы предоставляем полный пакет документов: инвойсы, упаковочные листы, сертификаты происхождения, таможенные декларации и все необходимые документы для бухгалтерского учёта и налоговой отчётности."
        }
      },
      {
        "@type": "Question",
        "name": "Сколько времени занимает доставка?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Средний срок доставки из Китая в Россию составляет 15-25 дней в зависимости от региона отправки и выбранного способа транспортировки. Мы предоставляем точные сроки при оформлении заказа."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 blue:bg-blue-light monochrome:bg-white transition-colors overflow-x-hidden w-full max-w-full">
        <div className="w-full max-w-full overflow-x-hidden">
          <Header />
          <Hero />
          <Advantages />
          <CooperationFormats />
          <WorkSteps />
          <Testimonials />
          <FAQ />
          <ContactForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
