import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Accueil from "./Components/Acceuil";
import Formulaire from "./Components/Formulaire";
import DigiService from "./Components/digiservice";
import Apropos from "./Components/Apropos";
import Details from "./Components/details";
import Service from "./Components/Service";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import CreationCompte from "./Components/CreationCompte";
import AdminDashboard from "./Admin/AdminDashboard";
import ClientsDashboard from "./Clients/ClientsDashboard";

function AppContent() {
  const location = useLocation();

  // Pages où la navbar ne doit pas apparaître
  const noNavbarRoutes = ["/login", "/creation-compte", "/dashboard-admin", "/dashboard-client"];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Accueil />
              <DigiService />
              <Apropos />
              <Service />
            </>
          }
        />

        <Route path="/commander" element={<Formulaire />} />
        <Route path="/details" element={<Details />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creation-compte" element={<CreationCompte />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-client" element={<ClientsDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
