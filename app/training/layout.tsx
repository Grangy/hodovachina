import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  title: 'Обучение работе с поставками из Китая | Hodova China',
  description: 'Получите практические знания и опыт для успешной работы с поставками товаров из Китая. Групповое обучение от 12 999 ₽, индивидуальное от 39 999 ₽. Научитесь находить поставщиков, оформлять документы и организовывать логистику.',
  keywords: [
    'обучение поставкам из Китая',
    'курсы по работе с Китаем',
    'обучение импорту из Китая',
    'как работать с поставщиками из Китая',
    'обучение логистике из Китая',
    'курсы по выкупу товаров из Китая',
  ],
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
    canonical: '/training',
  },
  openGraph: {
    title: 'Обучение работе с поставками из Китая | Hodova China',
    description: 'Получите практические знания и опыт для успешной работы с поставками товаров из Китая. Групповое обучение от 12 999 ₽, индивидуальное от 39 999 ₽.',
    url: `${BASE_URL}/training`,
    siteName: 'Hodova China',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/main.png`,
        width: 1200,
        height: 630,
        alt: 'Обучение работе с поставками из Китая',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Обучение работе с поставками из Китая | Hodova China',
    description: 'Получите практические знания и опыт для успешной работы с поставками товаров из Китая. Групповое обучение от 12 999 ₽, индивидуальное от 39 999 ₽.',
    images: [`${BASE_URL}/images/main.png`],
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Обучение работе с поставками из Китая",
    "description": "Получите практические знания и опыт для успешной работы с поставками товаров из Китая",
    "provider": {
      "@type": "Organization",
      "name": "Hodova China",
      "url": BASE_URL
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Групповое обучение",
        "price": "12999",
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Индивидуальное обучение",
        "price": "39999",
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock"
      }
    ],
    "courseCode": "HODOVA-CHINA-TRAINING",
    "educationalLevel": "Professional",
    "inLanguage": "ru"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

