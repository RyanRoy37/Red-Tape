// src/components/common/Card.js
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  clickable = false,
  onClick
}) => {
  const baseClasses = 'border-4 border-black bg-white p-8 transition-all duration-300';
  const shadowClasses = 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
  const hoverClasses = hover 
    ? 'hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-1' 
    : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;