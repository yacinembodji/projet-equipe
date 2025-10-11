import React from "react";
import { Search, FileText, PenTool, User } from "lucide-react";
import image from "../assets/image.jpeg";

 function DigiService() {
  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center p-8">
      {/* Titre principal */}
      <h1 className="text-2xl font-bold text-center text-black mb-2">
        CONNECTEZ VOUS POUR <br /> TÉLÉCHARGER VOTRE SERVICE
      </h1>

      {/* Barre de recherche */}
      <div className="mt-6 w-full max-w-xl flex items-center bg-white shadow-md rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="RECHERCHEZ VOS CRÉATIONS"
          className="flex-1 outline-none text-gray-600 px-2"
        />
        <Search className="text-gray-500 w-5 h-5" />
      </div>

      {/* Section principale */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl">
        {/* Image unique */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition-transform duration-300">
          <img
     src={image}
     alt="Service numérique"
     className="w-full max-w-sm rounded-xl object-cover mb-4"
/>

          <p className="font-semibold text-center text-gray-700">
            Votre service numérique professionnel
          </p>
        </div>

        {/* Texte descriptif */}
        <div className="text-left text-gray-700 space-y-6">
          <h2 className="text-xl font-bold text-purple-700">
            AVANTAGES DE NOTRE PLATEFORME DIGISERVICE
          </h2>

          <div className="flex items-start space-x-3">
            <FileText className="text-purple-600 w-6 h-6" />
            <p>
              <span className="font-bold">Documents professionnels :</span>{" "}
              créez et gérez vos fichiers facilement.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <PenTool className="text-purple-600 w-6 h-6" />
            <p>
              <span className="font-bold">Design sur mesure :</span>{" "}
              personnalisez vos créations selon vos besoins.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <User className="text-purple-600 w-6 h-6" />
            <p>
              <span className="font-bold">Profil professionnel :</span>{" "}
              valorisez votre image grâce à des supports modernes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DigiService