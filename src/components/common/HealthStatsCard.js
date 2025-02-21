// src/components/common/HealthStatsCard.js
import React from 'react';
import Card from './Card';

const HealthStatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  className = '' 
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center">
        {icon && (
          <div className="p-3 rounded-full bg-primary-100 text-primary-600">
            {icon}
          </div>
        )}
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-2xl font-semibold text-primary-600">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="text-sm font-medium">{trendValue}</span>
              <svg 
                className={`w-4 h-4 ml-1 ${trend === 'up' ? 'transform rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default HealthStatsCard;