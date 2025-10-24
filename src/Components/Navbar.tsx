// src/Components/Navbar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // chemin de ton logo

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClass = "bg-digipurple text-white"; // couleur active

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-20 w-20 object-cover rounded-full" />
          <span className="text-xl font-bold">Digiservices</span>
        </div>

        {/* Liens desktop centrés */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <NavLink to="/" end className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Accueil
          </NavLink>
          <NavLink to="/apropos" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            À propos
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Contact
          </NavLink>
         
        </nav>

        {/* Bouton Se connecter */}
       <div className="hidden md:flex">
        <NavLink to="/login" className="px-5 py-2 border border-digipurple text-digipurple rounded-xl hover:bg-digipurple hover:text-white transition">
            Se connecter
          </NavLink>
  {/* <button className="px-5 py-2 border border-digipurple text-digipurple rounded-xl hover:bg-digipurple hover:text-white transition">
    Se connecter
  </button> */}
</div>

        {/* Bouton mobile */}
        <div className="md:hidden">
          <button aria-label="menu" onClick={() => setOpen(!open)} className="p-2 rounded-md border">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Liens mobile */}
      {open && (
        <nav className="md:hidden px-6 pb-4 space-y-2">
          <NavLink to="/" end onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Accueil
          </NavLink>
          <NavLink to="/apropos" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            À propos
          </NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Services
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => `block ${linkClass} ${isActive ? activeClass : "text-gray-700"}`}>
            Contact
          </NavLink>
          {/* <NavLink to="/login" onClick={() => setOpen(false)} className="px-4 py-2 rounded-md bg-digipurple text-white font-semibold">
            Se connecter
          </NavLink> */}
        </nav>
      )}
    </header>
  );
}
