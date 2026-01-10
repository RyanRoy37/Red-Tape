// src/components/common/Button.js
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'font-bold transition-all duration-300 border-4 border-black';
  
  const variants = {
    primary: 'bg-red-500 text-white hover:bg-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1',
    secondary: 'bg-black text-white hover:bg-red-500 hover:border-red-500',
    outline: 'bg-white text-black hover:bg-black hover:text-white'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-12 py-6 text-2xl'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;