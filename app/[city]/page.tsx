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

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: defaultCity.title,
      description: defaultCity.description,
    };
  }

  return {
    title: cityData.title,
    description: cityData.description,
    openGraph: {
      title: cityData.title,
      description: cityData.description,
      type: 'website',
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
