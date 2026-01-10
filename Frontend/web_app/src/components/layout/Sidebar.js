// src/components/layout/Sidebar.js
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Red Tape', path: '/advanced-analysis' },
    { name: 'Features', path: '/features' },
    { name: 'Documentation', path: '/docs' },
  ];

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-500 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-red-500 transition-colors duration-300"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <nav className="mt-12 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="block text-lg hover:text-red-500 transition-all duration-300 hover:translate-x-2"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;