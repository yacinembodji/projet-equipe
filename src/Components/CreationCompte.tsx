// src/components/CreationCompte.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setCurrentUser } from "../Produits/ClientService";

const API_BASE = "https://essayedeployer.onrender.com"; // utilise l'API distante

const CreationCompte: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // pour redirection

  const isPasswordValid = (pwd: string) => {
    return pwd.length >= 1 && pwd.length <= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setMessage("Erreur : le mot de passe doit contenir entre 1 et 8 caractères");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "client" }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Compte créé avec succès ✅");
        Swal.fire({
          icon: "success",
          title: "Compte créé",
          text: "Ton compte a été créé — bienvenue !",
          timer: 1400,
          showConfirmButton: false,
        });

        // Stocker l'utilisateur pour la session
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);

        // Reset formulaire
        setName("");
        setEmail("");
        setPassword("");

        // Redirection vers Connexion pour se connecter
        navigate("/login", { replace: true });
      } else {
        const errorText = await response.text();
        setMessage("Erreur : " + errorText);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: errorText,
        });
      }
    } catch (error: any) {
      console.error(error);
      setMessage("Erreur : " + (error.message || "Erreur serveur"));
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.message || "Erreur serveur",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#751E9C] to-[#F3E5F7] p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nom</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
          <p className="text-sm text-gray-700 mt-1">
            Maximum 8 caractères
          </p>
        </div>

        {message && <p className="text-green-500 mb-4">{message}</p>}

        <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-lg font-bold hover:bg-purple-800 transition">
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default CreationCompte;
