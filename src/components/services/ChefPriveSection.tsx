import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const menus = [
  {
    id: 'decouverte',
    items: ['amuse', 'starter', 'mainCourse', 'dessert'],
    services: 4
  },
  {
    id: 'prestige',
    items: ['amuse', 'starter', 'mainCourse', 'cheese', 'preDessert', 'dessert'],
    services: 5
  },
  {
    id: 'degustation',
    items: ['amuse', 'starter', 'fishCourse', 'meatCourse', 'cheese', 'preDessert', 'dessert'],
    services: 6
  }
];

const plateImages = [
  {
    src: '/photos/chef_privee_a_domicile/image6.jpg',
    alt: 'Plat gastronomique 1'
  },
  {
    src: '/photos/chef_privee_a_domicile/image7.jpg',
    alt: 'Plat gastronomique 2'
  },
  {
    src: '/photos/chef_privee_a_domicile/image8.jpg',
    alt: 'Plat gastronomique 3'
  }
];

const ChefPriveSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const getMenuTitle = (id: string) => {
    switch (id) {
      case 'decouverte':
        return t('discoveryMenu');
      case 'prestige':
        return t('prestigeMenu');
      case 'degustation':
        return t('degustationMenu');
      default:
        return '';
    }
  };

  return (
    <section id="chef-prive" className="pb-4">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <img 
            src="/logo/logo.png"
            alt="Marramigos"
            className="h-24 mx-auto mb-8"
          />
          <h2 className="text-4xl font-serif text-terracotta mb-8">{t('chefPriveTitle')}</h2>
          <div className="w-24 h-0.5 bg-terracotta mx-auto mb-12"></div>
        </motion.div>

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 mb-16 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none">
          {plateImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="shrink-0 w-[78%] sm:w-[58%] md:w-auto snap-center rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                loading="lazy"
                className="w-full h-56 md:h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-textMedium max-w-4xl mx-auto mb-16"
        >
          {t('chefPriveDescription')}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-serif text-terracotta text-center mb-12"
        >
          {t('menuTypes')}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {menus.map((menu, index) => (
            <motion.div
              key={menu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg border border-beige flex flex-col h-full"
            >
              <h4 className="text-2xl font-serif text-center text-terracotta mb-6">
                {getMenuTitle(menu.id)}
              </h4>
              <ul className="space-y-3 text-center font-serif text-textMedium mb-6 flex-grow">
                {menu.items.map((item, idx) => (
                  <li key={idx} className="border-b border-beige pb-2 last:border-b-0">
                    {t(item)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-center text-textMedium italic mb-4">
                {t('servicesNote')} {menu.services} {t('service')}
              </p>
              <p className="text-sm text-center text-textMedium mb-6">{t('menuDescription')}</p>
              <div className="flex justify-end">
                <img 
                  src="/logo/logo.png"
                  alt="Marramigos"
                  className="h-16"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center text-sm text-textMedium mt-12 space-y-4 max-w-3xl mx-auto">
          <p>{t('wineNote')}</p>
          <p>{t('requestNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default ChefPriveSection;