import React from "react";
import logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center ">
           <img
            src={logo} />
          
            <span className="text-purple-700 font-bold"></span>
          </div>
          <span className="text-lg font-semibold text-purple-800">Digiservices</span>
        </div>
        

        {/* Liens (cachés sur petits écrans) apres je vais regler la cache */}
        <div className="hidden md:flex gap-6">
          <a href="#" className="text-black-900 hover:text-black-600">Accueil</a>
          <a href="#" className="text-black-900 hover:text-black-600">Services</a>
          <a href="#" className="text-black-900 hover:text-black-600">Contact</a>
          <a href="#" className="text-black-800 hover:text-black-600">Tarif</a>

          {/* <button className="bg-[#751E9C] text-white px-4 py-2 rounded-md">
            Se connecter
          </button> */}
        </div>

        {/* Bouton Se connecter */}
        <div>
          <button className="px-4 py-2 rounded-lg border-2 border-digipurple text-digipurple font-medium hover:bg-digipurple hover:text-white transition">
            Se connecter
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden ml-3">
          <button aria-label="menu" className="p-2 rounded-md">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}
          </button>
        </div>
      </nav>
    </header>
  );
}
