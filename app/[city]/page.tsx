import Header from '../components/Header';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import CooperationFormats from '../components/CooperationFormats';
import WorkSteps from '../components/WorkSteps';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { getCityBySlug, defaultCity, getAllCitySlugs } from '../data/cities';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    city: slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: defaultCity.title,
      description: defaultCity.description,
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
    };
  }

  const keywords = [
    `оптовые поставки из Китая в ${cityData.name}`,
    `товары из Китая в ${cityData.name}`,
    `доставка из Китая в ${cityData.name}`,
    `растаможка товаров ${cityData.name}`,
    `выкуп товаров ${cityData.nameGenitive}`,
    "производство в Китае",
    "брендирование товаров",
    "логистика из Китая",
    "совместные закупки",
    "оптовая торговля",
  ];

  return {
    title: cityData.title,
    description: cityData.description,
    keywords,
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
      canonical: `/${city}`,
    },
    openGraph: {
      title: cityData.title,
      description: cityData.description,
      type: 'website',
      url: `${BASE_URL}/${city}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 blue:bg-blue-light monochrome:bg-white transition-colors">
      <Header />
      <Hero cityData={cityData} />
      <Advantages />
      <CooperationFormats cityData={cityData} />
      <WorkSteps cityData={cityData} />
      <Testimonials cityData={cityData} />
      <FAQ />
      <ContactForm cityData={cityData} />
      <Footer cityData={cityData} />
    </div>
  );
}
