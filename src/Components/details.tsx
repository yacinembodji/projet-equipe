import React from "react";


export default function Details() {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-10 animate-fadeIn fixed inset-0 overflow-hidden">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Détails sur nos services
      </h1>

      <p className="text-gray-700 text-lg max-w-3xl text-center mb-10">
        Chez <span className="font-semibold text-purple-600">DigiService</span>,
        nous mettons notre expertise au service de votre réussite digitale.
        De la conception graphique à la création de CV professionnels en passant
        par le développement web, nous accompagnons nos clients dans chaque étape
        de leur projet.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl items-start">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Création de CV</h3>
          <p className="text-gray-600">Des modèles modernes et adaptés à votre profil professionnel.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Logos et Design</h3>
          <p className="text-gray-600">Conception de logos et visuels uniques pour votre marque.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Affiche</h3>
          <p className="text-gray-600">Création d'affiches modernes et responsives pour votre activité.</p>
        </div>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-10 px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        Retour
      </button>
    </div>
  );
}
