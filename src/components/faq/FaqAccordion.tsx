import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">{t('faqTitle')}</h1>
          <div className="divider"></div>
          <p className="text-center text-textMedium max-w-3xl mx-auto mb-12">
            {t('faqSubtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {t('faqQuestions').map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-4"
            >
              <div
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between items-center p-5 bg-white rounded-lg shadow-sm cursor-pointer transition-colors duration-300 ${
                  activeIndex === index ? 'bg-beige-light' : 'hover:bg-beige-light'
                }`}
              >
                <h3 className="text-lg font-serif font-semibold pr-8">{item.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-terracotta" size={24} />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-white rounded-b-lg shadow-sm"
              >
                <div className="p-5 border-t border-beige">
                  <p className="text-textMedium">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;