import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Accueil from "./Components/Acceuil";
import Formulaire from "./Components/Formulaire";
import Services from "./Components/Service";
import CreationCompte from "./Components/CreationCompte";
// import UsersList from "./Admin/UsersList";
import AdminDashboard from "./Admin/AdminDashboard";
import ClientDashboard from "./Clients/ClientsDashboard";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Définir les pages où la Navbar doit apparaître
  const navbarPages = ["/", "/services", "/apropos", "/contact", "commander"];
  const showNavbar = navbarPages.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/commander" element={<Formulaire onRetour={() => navigate("/")} />} />
        <Route path="/service" element={<Services onRetour={() => navigate("/")} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creation-compte" element={<CreationCompte />} />
        {/* <Route path="/produits" element={<UsersList />} /> */}
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
      <Route path="/dashboard-client" element={<ClientDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
