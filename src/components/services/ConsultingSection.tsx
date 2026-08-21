import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const consultingImages = [
  'https://red-scorpion-816387.hostingersite.com/Marramigos/photos/consulting/image4.jpg',
  'https://red-scorpion-816387.hostingersite.com/Marramigos/photos/consulting/image5.jpg'
];

const ConsultingSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <section id="consulting" className="section-padding bg-beige-light">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{t('consultingTitle')}</h2>
          <div className="divider"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-textMedium mb-6">
              {t('consultingDescription')}
            </p>
            <p className="text-textMedium">
              {t('consultingText')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={consultingImages[0]} 
                alt="Consulting culinaire" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-lg overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={consultingImages[1]} 
                alt="Consulting culinaire" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-xl font-serif font-semibold mb-6">{t('consultingServices')}</h3>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-terracotta rounded-full mr-2 mt-2"></span>
                <span>{t('consultingService1')}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-terracotta rounded-full mr-2 mt-2"></span>
                <span>{t('consultingService2')}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-terracotta rounded-full mr-2 mt-2"></span>
                <span>{t('consultingService3')}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-terracotta rounded-full mr-2 mt-2"></span>
                <span>{t('consultingService4')}</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-terracotta rounded-full mr-2 mt-2"></span>
                <span>{t('consultingService5')}</span>
              </li>
            </ul>
            <p className="text-textMedium">
              {t('consultingObjective')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;