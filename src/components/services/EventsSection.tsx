import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const eventImages = [
  {
    id: 1,
    src: '/photos/evenements/image11.jpg',
    alt: 'Événement sur mesure'
  },
  {
    id: 2,
    src: '/photos/evenements/image12.jpg',
    alt: 'Événement privé'
  },
  {
    id: 3,
    src: '/photos/evenements/image13.jpg',
    alt: 'Célébration festive'
  },
  {
    id: 4,
    src: '/photos/evenements/image14.jpg',
    alt: 'Événement d\'entreprise'
  }
];

const EventsSection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % eventImages.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + eventImages.length) % eventImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <section id="evenements" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{t('eventsTitle')}</h2>
          <div className="divider"></div>
          <p className="text-center text-textMedium max-w-3xl mx-auto mb-12">
            {t('eventsDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-8">
          <div className="flex flex-col order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-textMedium mb-6">
                {t('eventsText1')}
              </p>
              <p className="text-textMedium mb-6">
                {t('eventsText2')}
              </p>
              <p className="text-textMedium mb-8">
                {t('eventsText3')}
              </p>
              <div className="text-center lg:text-left">
                <Link to="/contact" className="btn-primary">
                  {t('eventsContact')}
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {eventImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute bottom-6 left-[calc(50%-4.5rem)] sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={30} />
            </button>
            
            <img 
              src={eventImages[selectedImage].src} 
              alt={eventImages[selectedImage].alt} 
              className="max-h-[74vh] sm:max-h-[90vh] max-w-[92vw] sm:max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button 
              className="absolute bottom-6 right-[calc(50%-4.5rem)] sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={30} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;