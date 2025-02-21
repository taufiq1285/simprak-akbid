import React from 'react';

const LoadingSpinner = ({ 
  size = 'md',
  color = 'blue',
  fullScreen = false
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colors = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    green: 'border-green-500',
    red: 'border-red-500'
  };

  const spinnerClasses = `
    animate-spin rounded-full
    border-2 border-t-transparent
    ${sizes[size]} ${colors[color]}
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className={spinnerClasses} />
      </div>
    );
  }

  return <div className={spinnerClasses} />;
};

// Loading container for sections
export const LoadingContainer = ({ children, loading, error }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
};

export default LoadingSpinner;