import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: '/photos/le_chef/image16.jpg',
    alt: 'Entrée gastronomique'
  },
  {
    id: 2,
    src: '/photos/le_chef/image17.jpg',
    alt: 'Plat gastronomique'
  },
  {
    id: 3,
    src: '/photos/le_chef/image18.jpg',
    alt: 'Adrian & celine'
  }
];

const ChefProfile = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [galleryRef, galleryInView] = useInView({
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
    setSelectedImage((selectedImage + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Le Chef</h1>
          <div className="divider"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-lg overflow-hidden shadow-xl cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <div className="aspect-[3/4] w-full max-w-[500px] mx-auto">
              <img 
                src="/photos/le_chef/le_chef.jpg" 
                alt="Chef Adrien Chamy" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-serif font-semibold mb-6">{t('chefTitle')}</h2>
            <p className="text-textMedium mb-4">{t('chefDescription1')}</p>
            <p className="text-textMedium mb-4">{t('chefDescription2')}</p>
            <p className="text-textMedium mb-4">{t('chefDescription3')}</p>
            <p className="text-textMedium mb-4">{t('chefDescription4')}</p>
            <p className="text-textMedium mb-4">{t('chefDescription5')}</p>
            <p className="text-textMedium mb-8">{t('chefDescription6')}</p>
            <Link to="/contact" className="btn-primary">
              {t('bookSlot')}
            </Link>
          </motion.div>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <div className="aspect-[4/3] w-full max-w-[400px] mx-auto">
                <img 
                  src={image.src}
                loading="lazy" 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              
              <motion.img 
                src={selectedImage === 0 
                  ? "/photos/le_chef/le_chef.jpg"
                  : galleryImages[selectedImage - 1].src
                } 
                alt="Image en plein écran"
                className="max-h-[74vh] sm:max-h-[90vh] max-w-[92vw] sm:max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <button 
                className="absolute bottom-6 right-[calc(50%-4.5rem)] sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <ChevronRight size={30} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ChefProfile;