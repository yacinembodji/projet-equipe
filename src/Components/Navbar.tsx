import React, { useState } from "react";
import logo from "../assets/logo.png";
//import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="bg-purple-400 max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logo} alt="Logo" className="object-cover w-full h-full" />
          </div>
          <span className="text-lg font-semibold text-purple-800">Digiservices</span>
        </div>

        {/* Liens */}
        <ul className={`md:flex gap-6 ${open ? "flex flex-col absolute top-20 left-0 w-full bg-purple-400 p-4 md:static md:flex-row" : "hidden"}`}>
          <li><a href="#" className="text-gray-900 hover:text-gray-600">Accueil</a></li>
          <li><a href="#" className="text-gray-900 hover:text-gray-600">Services</a></li>
          <li><a href="#" className="text-gray-900 hover:text-gray-600">Contact</a></li>
          <li><a href="#" className="text-gray-900 hover:text-gray-600">Tarif</a></li>
        </ul>

        {/* Bouton Se connecter */}
        <div className="hidden md:block">
          <button className="px-4 py-2 rounded-lg border-2 border-purple-700 text-purple-700 font-medium hover:bg-purple-700 hover:text-white transition">
            Se connecter
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden ml-3">
          <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2 rounded-md">
            {open ? (
              <span className="text-black font-bold text-xl">✕</span>
            ) : (
              <span className="text-black font-bold text-xl">☰</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
