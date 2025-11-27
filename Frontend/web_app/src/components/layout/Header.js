// src/components/layout/Header.js
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ onMenuClick, showMenu = true }) => {
  return (
    <header className="border-b-4 border-black bg-white py-6 px-6 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-red-500 border-4 border-black flex items-center justify-center">
            <span className="text-white text-2xl font-bold">RT</span>
          </div>
          <h1 className="text-3xl font-bold tracking-wider">RED TAPE</h1>
        </Link>

        {showMenu && (
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-red-500 hover:text-white transition-all duration-300 border-2 border-black"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;