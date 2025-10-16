import React from "react";
import lass from "../assets/lass.jpg"; // 🔹 importe ton image ici
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // ✅ obligatoire

export default function APropos() {
  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full bg-white rounded-3xl shadow-lg p-10 gap-10">
        
        {/* Section gauche - À propos */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">À propos</h2>
          <p className="text-gray-700 mb-4 text-lg">
            Découvrez notre entreprise et notre mission.
          </p>
          <p className="text-gray-700 mb-8 text-lg">
            Nous sommes engagés à fournir des solutions innovantes pour répondre
            aux besoins de nos clients et améliorer leur quotidien.
          </p>
           <Link
        to="/details"
        className="mt-4 inline-block bg-digipurple text-white p-2 rounded hover:bg-digipurple transition"
      >
        En savoir plus
      </Link>
        </div>

        {/* Section droite - Digiservices */}
        <div className="flex-1 bg-purple-200 rounded-3xl p-8 text-center shadow-inner">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Digiservices</h3>

          {/* 🔹 Image à la place du carré mauve */}
          <div className="flex justify-center mb-6  object-cover">
            <img
              src={lass} 
              alt="Nos services"
              className="rounded-2xl w-40 h-28 object-cover shadow-md"
            />
          </div>

          <h4 className="text-2xl font-semibold mb-4 text-gray-900">
           Notre mission
          </h4>

          <p className="text-2xl text-left text-gray-700 space-y-2 mx-auto w-max list-disc list-inside">
            Offrir des solution innovantes <br/>et efficace à nos clients
           
          </p>
{/* 
          <button className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition">
            Contact
          </button> */}
        </div>
      </div>
    </div>
  );
}
