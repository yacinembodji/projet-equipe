import React, { useState } from "react";
import Swal from "sweetalert2";

type FormulaireProps = {
  onRetour: () => void;
};

export default function Formulaire({ onRetour }: FormulaireProps) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [typeCreation, setTypeCreation] = useState("Logo");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    } catch (err: any) {
      console.error(err);

      // SweetAlert pour erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.message || "Une erreur est survenue lors de l'envoi.",
        confirmButtonColor: "#ef4444", // rouge
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-digipurple">Formulaire de commande</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="nom" className="block font-medium mb-2">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
            placeholder="Entrez votre email"
            required
          />
        </div>

        <div>
          <label htmlFor="typeCreation" className="block font-medium mb-2">Type de création</label>
          <select
            id="typeCreation"
            value={typeCreation}
            onChange={(e) => setTypeCreation(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition"
          >
            <option>Logo</option>
            <option>CV</option>
            <option>Affiche</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="details" className="block font-medium mb-2">Détails de la commande</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-digipurple focus:border-digipurple transition resize-none"
            rows={5}
            placeholder="Décrivez les détails de votre commande"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-lg bg-digipurple text-white font-semibold text-lg hover:bg-purple-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>

          <button
            type="button"
            onClick={onRetour}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-lg"
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
