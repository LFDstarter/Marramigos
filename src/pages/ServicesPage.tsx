import React from 'react';
import ChefPriveSection from '../components/services/ChefPriveSection';
import EventsSection from '../components/services/EventsSection';
import ConsultingSection from '../components/services/ConsultingSection';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ChefPriveSection />
      <EventsSection />
      <ConsultingSection />
    </div>
  );
};

export default ServicesPage;