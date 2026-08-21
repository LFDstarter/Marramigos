import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const PrivacyPolicyPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="min-h-screen bg-cream py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-terracotta mb-8 text-center">
            Politique de Confidentialité
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Introduction</h2>
              <p className="text-textMedium">
                Chez Marramigos, nous accordons une importance primordiale à la protection de vos données personnelles. 
                Cette politique de confidentialité explique comment nous traitons les informations que vous nous confiez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Collecte des Données</h2>
              <p className="text-textMedium mb-4">
                Les seules données personnelles que nous collectons sont celles que vous nous fournissez volontairement 
                via notre formulaire de contact, à savoir :
              </p>
              <ul className="list-disc pl-6 text-textMedium space-y-2">
                <li>Votre nom</li>
                <li>Votre adresse email</li>
                <li>Le contenu de votre message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Utilisation des Données</h2>
              <p className="text-textMedium mb-4">
                Les informations que vous nous communiquez sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc pl-6 text-textMedium space-y-2">
                <li>Répondre à votre demande de contact</li>
                <li>Vous fournir les informations demandées</li>
                <li>Établir un devis personnalisé si souhaité</li>
              </ul>
              <p className="text-textMedium mt-4">
                Nous ne conservons vos données que le temps nécessaire au traitement de votre demande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Cookies et Traceurs</h2>
              <p className="text-textMedium">
                Notre site n'utilise aucun cookie de tracking ou de publicité. Nous ne collectons aucune 
                donnée de navigation et ne suivons pas votre activité en ligne.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Partage des Données</h2>
              <p className="text-textMedium">
                Nous ne partageons, ne vendons, ni ne transmettons vos données personnelles à des tiers. 
                Vos informations restent strictement confidentielles et sont utilisées uniquement par 
                notre équipe pour traiter votre demande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Sécurité des Données</h2>
              <p className="text-textMedium">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
                contre tout accès, modification, divulgation ou destruction non autorisés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Vos Droits</h2>
              <p className="text-textMedium mb-4">
                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-textMedium space-y-2">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit d'opposition au traitement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold mb-4">Contact</h2>
              <p className="text-textMedium">
                Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, 
                vous pouvez nous contacter à l'adresse suivante : marramigos@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;