import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const CallToAction = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-terracotta">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-textMedium mb-8">
            {t('ctaText')}
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-terracotta text-white hover:bg-terracotta-dark px-10 py-4 text-lg font-semibold tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;