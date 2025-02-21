// src/components/praktikum/PraktikumStats.js
import React from 'react';

const StatCard = ({ title, value, icon, trendValue, trendType }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary-100 text-primary-600">
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {trendValue && (
          <div className={`flex items-center ${
            trendType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="text-sm font-medium">{trendValue}</span>
            <svg
              className={`w-4 h-4 ml-1 ${trendType === 'increase' ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const DataTable = ({ data, columns }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((column, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    aktif: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    selesai: 'bg-blue-100 text-blue-800',
    batal: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status.toLowerCase()]}`}>
      {status}
    </span>
  );
};

const ProgressBar = ({ value, max, className }) => {
  const percentage = (value / max) * 100;
  return (
    <div className={`h-2 bg-gray-200 rounded-full ${className}`}>
      <div
        className="h-2 bg-primary-600 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export { StatCard, DataTable, StatusBadge, ProgressBar };