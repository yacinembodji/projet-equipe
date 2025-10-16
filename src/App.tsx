import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Acceuil from "./Components/Acceuil";
import DigiService from "./Components/digiservice";
import Apropos from "./Components/Apropos";
import Details from "./Components/details";
import Service from "./Components/Service";

function App() {

  return (
    <Router>
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
        {/* Page à propos */}
        <Route path="/apropos" element={<Apropos />} />
        {/* Page service */}
        <Route path="/service" element={<Service />} />
      </Routes>
      

    </Router>
  );
}

export default App;
