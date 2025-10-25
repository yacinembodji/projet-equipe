import React from "react";
import fonnd from "../assets/fonnd.jpg";

const Contact = () => {


  return (
    <div className="bg-digipurple text-white  flex flex-col items-center py-16 px-6 rounded-2xl">
      {/* Titre principal */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 italic text-center">
        contactez-nous
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        vous avez un projet de création ?
      </h2>

      {/* Texte d’introduction */}
      <p className="text-center max-w-2xl mb-10 leading-relaxed">
        Que ce soit un <strong>Logo</strong>, une <strong>Affiche</strong> ou un
        <strong> CV</strong>, notre équipe met son savoir-faire à votre service
        pour donner vie à vos idées. Contactez-nous dès aujourd'hui et recevez
        une proposition personnalisée adaptée à vos besoins.
      </p>

      {/* Informations de contact */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-center">
        <div>
          <div className="text-3xl mb-2">📧</div>
          <h3 className="font-semibold">Email</h3>
          <p>digiservice@gmail.com</p>
        </div>
        <div>
          <div className="text-3xl mb-2">📞</div>
          <h3 className="font-semibold">Téléphone</h3>
          <p>78 900 00 00</p>
        </div>
        <div>
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-semibold">Adresse</h3>
          <p>rue 121, Fahu</p>
        </div>
        <div>
          <div className="text-3xl mb-2">⏰</div>
          <h3 className="font-semibold">Horaires</h3>
          <p>
            Lun-ven <br /> 09h - 18h
          </p>
        </div>
      </div>

      {/* Formulaire et image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white text-black rounded-2xl shadow-lg p-8">
        {/* Formulaire */}
        <form className="space-y-4">
          <h3 className="text-xl font-semibold text-digipurple mb-4">
            contactez-nous
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Prénom"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Adresse-email"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <textarea
            placeholder="Message"
            rows={4}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-digipurple text-white py-2 rounded hover:bg-purple-800 transition"
          >
            ENVOYER
          </button>
        </form>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={fonnd}
            alt="Contact équipe"
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
