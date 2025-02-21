// src/components/common/Card.js
import React from 'react';

const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  hover = false,
  bordered = false
}) => {
  const variants = {
    default: 'bg-white',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    info: 'bg-blue-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    danger: 'bg-red-50'
  };

  const hoverEffects = hover ? 'transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg' : '';
  const borderStyle = bordered ? 'border border-gray-200' : '';

  return (
    <div className={`
      rounded-xl shadow-sm
      ${variants[variant]}
      ${hoverEffects}
      ${borderStyle}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;