import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import ChefPriveSection from '../components/services/ChefPriveSection';
import EventsSection from '../components/services/EventsSection';
import ConsultingSection from '../components/services/ConsultingSection';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if we should scroll to services section
    if (location.pathname === '/nos-prestations' || 
        (location.state as any)?.scrollToServices) {
      const element = document.getElementById('nos-prestations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <Introduction />
      <div id="nos-prestations">
        <ChefPriveSection />
        <EventsSection />
        <ConsultingSection />
      </div>
      <CallToAction />
    </main>
  );
};

export default HomePage;