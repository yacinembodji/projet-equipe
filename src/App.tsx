<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Accueil from "./Components/Acceuil";
import Formulaire from "./Components/Formulaire";
import Services from "./Components/Service";
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Acceuil from "./Components/Acceuil";
import DigiService from "./Components/digiservice";
import Apropos from "./Components/Apropos";
import Details from "./Components/details";
import Service from "./Components/service";
>>>>>>> digiservice

function App() {
  const [page, setPage] = useState<"accueil" | "formulaire" | "services">("accueil");

  return (
    <Router>
<<<<<<< HEAD
      <div className="min-h-screen">
        <Navbar />

        {/* Configuration du Router */}
        <Routes>
          <Route
            path="/"
            element={
              <Accueil
                onCommander={() => setPage("formulaire")}
                onVoirServices={() => setPage("services")}
              />
            }
          />
          <Route
            path="/commander"
            element={<Formulaire onRetour={() => setPage("accueil")} />}
          />
          <Route
            path="/services"
            element={<Services onRetour={() => setPage("accueil")} />}
          />
        </Routes>

        {/* Rendu conditionnel existant (tu peux le garder si tu veux naviguer par état) */}
        {/* {page === "accueil" && (
          <Accueil
            onCommander={() => setPage("formulaire")}
            onVoirServices={() => setPage("services")}
          />
        )} */}

        {page === "formulaire" && (
          <Formulaire onRetour={() => setPage("accueil")} />
        )}

        {page === "services" && (
          <Services onRetour={() => setPage("accueil")} />
        )}
      </div>
=======
      <Navbar />
      <Routes>
        {/* Page principale qui affiche toutes les sections */}
        <Route 
          path="/" 
          element={
            <>
              <Acceuil />
              <DigiService />
              <Apropos />
              <Service />
            </>
          } 
        />
        {/* Page détails */}
        <Route path="/details" element={<Details />} />
      </Routes>
>>>>>>> digiservice
    </Router>
  );
}

export default App;
