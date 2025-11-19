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
};

export default function Home() {
  return (
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
  );
}
