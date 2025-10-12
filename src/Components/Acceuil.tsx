import React from "react";
import { useNavigate } from "react-router-dom";
import masss from "../assets/masss.jpg";

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
        {/* Texte et boutons */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Commandez Vos <br /> Créations en ligne <br /> facilement
          </h1>

          <p className="mt-6 text-lg text-black/70 italic max-w-xl mx-auto md:mx-0">
            Affiche, Logo et CV modernes pour particuliers et entreprises.
            Passez vos commandes en quelques clics
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/commander")}
              className="px-6 py-3 rounded-md bg-digipurple text-white text-lg font-semibold shadow-md hover:opacity-95 transition"
            >
              Commander maintenant
            </button>

            <button
              onClick={() => navigate("/services")}
              className="px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-700 text-lg font-medium"
            >
              Voir nos services
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-center">
          <div className="relative w-64 h-80 md:w-100 md:h-80 rounded-full overflow-hidden bg-purple-800 shadow-xl">
            <img src={masss} alt="masss" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
