import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import CooperationFormats from './components/CooperationFormats';
import WorkSteps from './components/WorkSteps';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

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
