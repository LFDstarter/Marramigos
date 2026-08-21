import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img 
                src="/logo/logo_white.png" 
                alt="Marramigos" 
                className="h-20 mb-4"
              />
            </Link>
            <p className="text-gray-300 text-center md:text-left">
              {t('footerDescription')}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-serif mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/" className="text-gray-300 hover:text-terracotta transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/nos-prestations" className="text-gray-300 hover:text-terracotta transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/le-chef" className="text-gray-300 hover:text-terracotta transition-colors">
                  {t('chef')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-terracotta transition-colors">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-terracotta transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-serif mb-4">{t('contact')}</h3>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} className="text-terracotta" />
                <a href="mailto:marramigos@gmail.com" className="text-gray-300 hover:text-terracotta transition-colors break-words">
                  marramigos@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={18} className="text-terracotta" />
                <a href="tel:+212771041175" className="text-gray-300 hover:text-terracotta transition-colors break-words">
                  +212 7 71 04 11 75
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <a 
                  href="https://instagram.com/marramigos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-terracotta transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576839780263" 
                  className="text-gray-300 hover:text-terracotta transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://wa.me/2120771041175" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-terracotta transition-colors"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Marramigos. {t('allRightsReserved')}
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-terracotta transition-colors">
                {t('legalNotice')}
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-terracotta transition-colors">
                {t('privacyPolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;