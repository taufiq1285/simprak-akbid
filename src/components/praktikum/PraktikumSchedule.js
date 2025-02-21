// src/components/praktikum/PraktikumSchedule.js
import React from 'react';
import Card from '../common/Card';

const PraktikumSchedule = ({ schedules }) => {
  const getDayColor = (day) => {
    const colors = {
      'Senin': 'bg-blue-100 text-blue-800',
      'Selasa': 'bg-purple-100 text-purple-800',
      'Rabu': 'bg-green-100 text-green-800',
      'Kamis': 'bg-yellow-100 text-yellow-800',
      'Jumat': 'bg-pink-100 text-pink-800',
      'Sabtu': 'bg-orange-100 text-orange-800'
    };
    return colors[day] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Akan Datang': 'bg-blue-100 text-blue-800',
      'Sedang Berlangsung': 'bg-green-100 text-green-800',
      'Selesai': 'bg-gray-100 text-gray-800',
      'Dibatalkan': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Jadwal Praktikum</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {schedules.map((schedule, index) => (
          <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDayColor(schedule.day)}`}>
                  {schedule.day}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{schedule.title}</h3>
                  <p className="text-sm text-gray-500">{schedule.time}</p>
                  <p className="text-sm text-gray-500">{schedule.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                  {schedule.status}
                </span>
                <span className="text-sm text-gray-500">
                  {schedule.participants} Mahasiswa
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Pembimbing: {schedule.instructor}</span>
              </div>
              {schedule.notes && (
                <p className="mt-2 text-sm text-gray-500">
                  {schedule.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PraktikumSchedule;