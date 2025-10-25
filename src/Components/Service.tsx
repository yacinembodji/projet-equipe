import React from "react";

type ServicesProps = {
  onRetour?: () => void;
};

export default function Services({ onRetour }: ServicesProps) {
  const services = [
    {
      title: "Création de Logo",
      description: "Design professionnel et unique pour votre marque",
      icon: "🎨",
      features: ["Design personnalisé", "Formats multiples", "Droits d'auteur"]
    },
    {
      title: "CV Design",
      description: "CV moderne et professionnel pour booster votre carrière",
      icon: "📄",
      features: ["Templates modernes", "Optimisation ATS", "Formats PDF/Word"]
    },
    {
      title: "Affiche Publicitaire",
      description: "Affiches impactantes pour vos campagnes marketing",
      icon: "📢",
      features: ["Design créatif", "Formats standards", "Impression prête"]
    },
    {
      title: "Autre Services",
      description: "Solutions personnalisées selon vos besoins",
      icon: "✨",
      features: ["Consultation gratuite", "Devis sur mesure", "Suivi personnalisé"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Nos Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre gamme complète de services de design graphique professionnels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer votre projet ?</h2>
          <p className="text-purple-100 mb-6">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
          </p>
          <button className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Commander maintenant
          </button>
        </div>
      </div>

      {onRetour && (
        <div className="text-center mt-8">
          <button onClick={onRetour} className="text-purple-600 hover:text-purple-800 font-medium underline">
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}
