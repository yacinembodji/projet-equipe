import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Accueil from "./Components/Acceuil";
import Formulaire from "./Components/Formulaire";
import Services from "./Components/Service";

function App() {
  const [page, setPage] = useState<"accueil" | "formulaire" | "services">("accueil");

  return (
    <Router>
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
    </Router>
  );
}

export default App;
