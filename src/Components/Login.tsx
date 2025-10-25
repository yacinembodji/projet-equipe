import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UsersService from "../services/UsersService"; // Assure-toi du chemin
import { setCurrentUser } from "../Produits/ClientService";
import type { User } from "../services/UsersService";

const Connexion: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Récupérer tous les utilisateurs
      const users: User[] = await UsersService.getAll();

      // Vérifier les identifiants
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Stocker l'utilisateur pour la session
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);

        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          text: `Bienvenue ${user.name} !`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirection selon le rôle
        if (user.role === "admin") {
          navigate("/dashboard-admin"); // dashboard admin
        } else if (user.role === "client") {
          navigate("/dashboard-client"); // redirection pour client
        } else {
          navigate("/dashboard-client"); // redirection par défaut pour client
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Email ou mot de passe incorrect",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de contacter le serveur",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: emailInput } = await Swal.fire({
      title: "Mot de passe oublié",
      input: "email",
      inputLabel: "Entrez votre adresse email",
      inputPlaceholder: "votre.email@example.com",
      showCancelButton: true,
      confirmButtonText: "Envoyer",
      cancelButtonText: "Annuler",
      inputValidator: (value) => {
        if (!value) {
          return "Veuillez entrer une adresse email valide !";
        }
      },
    });

    if (emailInput) {
      try {
        // Récupérer tous les utilisateurs
        const users: User[] = await UsersService.getAll();
        const user = users.find((u) => u.email === emailInput);

        if (user) {
          // Simuler l'envoi d'un email avec le mot de passe
          Swal.fire({
            icon: "success",
            title: "Email envoyé",
            text: `Votre mot de passe est : ${user.password}. Vérifiez votre boîte mail.`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Aucun compte trouvé avec cette adresse email.",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de contacter le serveur",
        });
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="mt-4 text-center">
          <span
            className="text-purple-800 font-bold cursor-pointer block mb-2"
            onClick={() => handleForgotPassword()}
          >
            Mot de passe oublié ?
          </span>
          Pas encore de compte ?{" "}
          <span
            className="text-purple-800 font-bold cursor-pointer"
            onClick={() => navigate("/creation-compte")}
          >
            Créez-en un compte
          </span>
        </p>
      </form>
    </section>
  );
};

export default Connexion;
