import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FR, GB, ES } from 'country-flag-icons/react/3x2';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../translations';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // fermer le menu mobile : sur la page d'accueil l'URL ne change pas,
    // l'effet lie a `location` ne se declenche donc pas
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      // If we're on the home page, just scroll to the section
      const element = document.getElementById('nos-prestations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/', { state: { scrollToServices: true } });
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const languages = [
    { code: 'fr' as const, name: 'FR', flag: FR },
    { code: 'en' as const, name: 'EN', flag: GB },
    { code: 'es' as const, name: 'ES', flag: ES },
  ];

  const getCurrentFlag = () => {
    const lang = languages.find(l => l.code === language);
    const Flag = lang?.flag || FR;
    return <Flag className="w-4 h-4" />;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="z-10">
          <img 
            src="/logo/logo.png" 
            alt="Marramigos" 
            className="h-14 md:h-16"
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-textDark hover:text-terracotta font-medium transition-colors">
            {t('home')}
          </Link>
          <Link 
            to="/nos-prestations" 
            onClick={handleServicesClick}
            className="text-textDark hover:text-terracotta font-medium transition-colors"
          >
            {t('services')}
          </Link>
          <Link to="/le-chef" className="text-textDark hover:text-terracotta font-medium transition-colors">
            {t('chef')}
          </Link>
          <Link to="/faq" className="text-textDark hover:text-terracotta font-medium transition-colors">
            {t('faq')}
          </Link>
          
          <Link to="/contact" className="btn-primary">
            {t('contact')}
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-black/5 text-textDark"
            >
              {getCurrentFlag()}
              <span className="font-medium">{language.toUpperCase()}</span>
              <ChevronDown size={16} className={`transform transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                >
                  {languages.map((lang) => {
                    const Flag = lang.flag;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm ${
                          language === lang.code ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Flag className="w-4 h-4" />
                        <span>{lang.name}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <button 
          className="lg:hidden z-50 ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? (
            <X size={28} className="text-textDark" />
          ) : (
            <Menu size={28} className="text-textDark" />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col items-center justify-center"
            >
              <nav className="flex flex-col items-center space-y-6 text-center">
                <Link to="/" className="text-xl font-medium hover:text-terracotta transition-colors">
                  {t('home')}
                </Link>
                <Link 
                  to="/nos-prestations" 
                  onClick={handleServicesClick}
                  className="text-xl font-medium hover:text-terracotta transition-colors"
                >
                  {t('services')}
                </Link>
                <Link to="/le-chef" className="text-xl font-medium hover:text-terracotta transition-colors">
                  {t('chef')}
                </Link>
                <Link to="/faq" className="text-xl font-medium hover:text-terracotta transition-colors">
                  {t('faq')}
                </Link>
                
                <Link to="/contact" className="btn-primary mt-4">
                  {t('contact')}
                </Link>
                
                <div className="flex space-x-4 mt-8">
                  {languages.map((lang) => {
                    const Flag = lang.flag;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded ${
                          language === lang.code ? 'bg-terracotta text-white' : 'text-textDark hover:text-terracotta'
                        } transition-colors`}
                      >
                        <Flag className="w-4 h-4" />
                        <span>{lang.name}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;