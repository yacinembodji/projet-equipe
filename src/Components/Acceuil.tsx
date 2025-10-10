import React from "react";
import masss from "../assets/masss.jpg"; // place ton image ici

export default function Accueil() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: texte */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Commandez Vos <br /> Creations en ligne <br /> facilement
          </h1>

          <p className="mt-6 text-lg text-black/70 italic max-w-xl">
            Affiche, Logo et CV modernes pour particuliers et entreprises.
            passer vos commandes en quelques clics
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-md bg-digipurple text-white text-lg font-semibold shadow-md hover:opacity-95 transition">
              commander maintenant
            </button>

            <button className="px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-700 text-lg font-medium">
              voir nos services
            </button>
          </div>
        </div>
           
        
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-80 md:w-80 md:h-80 rounded-full overflow-hidden bg-purple-800 shadow-xl">
             <img
            src={masss} />
            <img src={"../assets/masss.jpg"} alt="masss" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
