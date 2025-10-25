import React from "react";
import { useNavigate } from "react-router-dom";

// 🔹 Importer tes images (assure-toi qu'elles sont dans le dossier assets)
import cv2 from "../assets/cv2.jpg";
import logo2 from "../assets/logo2.jpg";
import affiche2 from "../assets/affiche2.jpg";
import affiche3 from "../assets/affiche3.jpg";
import logo3 from "../assets/logo3.jpg";
import cv3 from "../assets/cv3.jpg";

export default function Services() {
  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center p-8">
    <div className="max-w-5xl  bg-purple-200 p-6  shadow-md rounded-3xl">
      {/* Titre */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Nos Services</h2>
        <p className="text-lg">
          Donner vie à vos idées avec nos services de création professionnelle: 
          Logo, CV, et Affiches sur mesure
        </p>
      </div>

      {/* Grille des services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Carte 1 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={cv2} alt="CV Design" className="w-full h-64  object-cover"/>
        </div>

        {/* Carte 2 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={logo2} alt="TRKVE Logo" className="w-full h-64 object-cover"/>
        </div>

        {/* Carte 3 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={affiche2} alt="CREATESCAPE Logo" className="w-full h-64 object-cover"/>
        </div>

        {/* Carte 4 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={affiche3} alt="Galadjo Design" className="w-full h-64 object-cover"/>
        </div>

        {/* Carte 5 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={logo3} alt="Royal Bites" className="w-full h-64 object-cover"/>
        </div>

        {/* Carte 6 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={cv3} alt="Brian Resume" className="w-full h-64 object-cover"/>
        </div>
      </div>
    </div>
    </div>
    
  );
}