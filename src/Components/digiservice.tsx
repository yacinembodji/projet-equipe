import React, { useState } from "react";
import { Search, FileText, PenTool, User } from "lucide-react";
import image from "../assets/image.jpeg";
import cv1 from "../assets/cv1.jpeg";
import affiche from "../assets/affiche.jpeg";
import logo1 from "../assets/logo1.jpeg";
import { Link } from "react-router-dom"; 


function DigiService() {
  const [search, setSearch] = useState("");

  const services = [
    {
      id: 1,
      titre: "Commande de Logos",
      description: "Obtenez un logo unique et personnalisé pour votre marque.",
      prix: "1500 F",
      bouton: "Commander un Logo",
      image: logo1,
      tags: ["logo", "logos", "design", "marque"],
    },
    {
      id: 2,
      titre: "Commande de CV",
      description: "Commandez un CV professionnel qui valorise votre parcours.",
      prix: "2000 F",
      bouton: "Commander un CV",
      image: cv1,
      tags: ["cv", "curriculum", "professionnel", "emploi"],
    },
    {
      id: 3,
      titre: "Commande d’Affiches",
      description:
        "Faites réaliser des affiches modernes et impactantes pour vos événements.",
      prix: "5000 F",
      bouton: "Commander une Affiche",
      image: affiche,
      tags: ["affiche", "affiches", "poster", "flyer", "publicité"],
    },
  ];

  // ✅ Nouveau filtrage : si barre vide => tout afficher
  const filteredServices =
    search.trim() === ""
      ? services
      : services.filter((service) =>
          service.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
        );

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center p-4">
      {/* Titre principal */}
      <h1 className="text-2xl font-bold text-center text-black mb-2">
        CONNECTEZ-VOUS POUR <br /> TÉLÉCHARGER VOTRE SERVICE
      </h1>

      {/* Barre de recherche */}
      <div className="mt-6 w-full max-w-xl flex items-center bg-white shadow-md rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="RECHERCHEZ VOS CRÉATIONS (ex: CV, Affiche, Logo)"
          className="flex-1 outline-none text-gray-600 px-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="text-gray-500 w-5 h-5" />
      </div>

      {/* Section principale */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl">
        {/* Image unique */}
        <div className="bg-purple p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition-transform duration-300">
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
        <div className="text-left text-gray-700 space-y-6 mt-20">
          <h2 className="text-xl font-bold text-digipurple">
            AVANTAGES DE NOTRE PLATEFORME DIGISERVICE
          </h2>

          <div className="flex items-start space-x-3">
            <FileText className="text-digipurple w-6 h-6" />
            <p className="text-xl">
              <span className="font-bold text-xl">Documents professionnels :</span>{" "}
              créez et gérez vos fichiers facilement.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <PenTool className="text-digipurple w-6 h-6" />
            <p className="text-xl">
              <span className="font-bold text-xl">Design sur mesure :</span>{" "}
              personnalisez vos créations selon vos besoins.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <User className="text-digipurple w-6 h-6" />
            <p className="text-xl">
              <span className="font-bold text-xl">Profil professionnel :</span>{" "}
              valorisez votre image grâce à des supports modernes.
            </p>
          </div>
        </div>
      </div>

      {/* Section Nos Services */}
      <div className="mt-16 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-black mb-4">
          Nos services
        </h2>
        <p className="text-center text-gray-700 mb-10 text-2xl">
          Notre application de multiservice permet de commander rapidement <br />
          vos logos, affiches et CV professionnels réalisés sur mesure pour vous.
        </p>

        {/* Liste des services filtrés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
              >
                <img
                  src={service.image}
                  alt={service.titre}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="font-bold mb-2">{service.titre}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="bg-digipurple text-white px-4 py-2 rounded-full mb-2 hover:bg-purple-800">
                  {service.bouton}
                </button>
                <span className="font-bold">{service.prix}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3 text-lg">
              Aucun résultat trouvé pour "{search}" 😕
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DigiService;
