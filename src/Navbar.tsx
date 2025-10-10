import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-[#F3E5F7] text-black mx-8 py-4 flex items-center justify-between shadow-md">
      {/*on va mettre notre LOGO */}
      <div className="text-2xl font-bold text-blue-400">
        Digiservices
      </div>

      {/* pour aligner la barre de navigation horizontal*/}
      <div className="flex items-center space-x-8">
        {/*  ici c'est les Liens */}
        <ul className="flex space-x-6">
          <li><a href="#accueil" className="hover:text-blue-400 transition">Accueil</a></li>
          <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>
          <li><a href="#tarif" className="hover:text-blue-400 transition">tarif</a></li>
          <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
        </ul>

        {/* ca concerne le Bouton Se connecter */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
          Se connecter
        </button>
      </div>
    </nav>
  );
}

