import React from 'react';

const Alert = ({ type = 'info', message, className = '' }) => {
  const types = {
    error: 'bg-red-100 text-red-800 border-red-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  return (
    <div className={`p-4 rounded-md border ${types[type]} ${className}`}>
      {message}
    </div>
  );
};

export default Alert;