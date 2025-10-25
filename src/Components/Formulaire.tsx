import React, { useState } from "react";
import Swal from "sweetalert2";
import CommandService, { type Command } from "../services/CommandService";

export default function Formulaire() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [typeCreation, setTypeCreation] = useState("Logo");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Créer la commande dans le backend
      const newCommand: Command = {
        clientId: "anonymous", // ou générer un ID unique si nécessaire
        productName: typeCreation,
        price: 0, // prix par défaut, peut être modifié plus tard
        date: new Date().toISOString().split('T')[0],
        status: "en attente",
        details: details,
        clientName: nom,
        clientEmail: email,
      };

      await CommandService.create(newCommand);

      // Envoyer aussi à Formspree pour notification email
      const res = await fetch("https://formspree.io/f/xqayynee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, typeCreation, details }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      // SweetAlert pour message de succès
      Swal.fire({
        icon: "success",
        title: "Commande envoyée !",
        text: `Merci ${nom}, votre commande a été envoyée avec succès.`,
        confirmButtonColor: "#6b21a8", // couleur digipurple
      });

      // Réinitialiser le formulaire
      setNom("");
      setEmail("");
      setTypeCreation("Logo");
      setDetails("");
    } catch (err: unknown) {
      console.error(err);

      // SweetAlert pour erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi.",
        confirmButtonColor: "#ef4444", // rouge
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-4 px-4 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-3 text-center text-digipurple">Formulaire de commande</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block font-medium mb-1">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div>
          <label htmlFor="typeCreation" className="block font-medium mb-1">Type de création</label>
          <select
            id="typeCreation"
            value={typeCreation}
            onChange={(e) => setTypeCreation(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
          >
            <option>Logo</option>
            <option>CV</option>
            <option>Affiche</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="details" className="block font-medium mb-1">Détails de la commande</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition resize-none"
            rows={4}
            placeholder="Décrivez les détails de votre commande"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg bg-digipurple text-white font-semibold text-base hover:bg-purple-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
