// src/pages/dashboard/AdminDashboard.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
  // Data simulasi untuk development
  const stats = [
    {
      title: "Total Mahasiswa",
      value: "150",
      icon: "👥",
      trend: "+5%",
      description: "Dibanding semester lalu"
    },
    {
      title: "Praktikum Aktif",
      value: "8",
      icon: "📚",
      trend: "+2",
      description: "Periode ini"
    },
    {
      title: "Jadwal Hari Ini",
      value: "5",
      icon: "📅",
      description: "3 Lab terpakai"
    },
    {
      title: "Tingkat Kelulusan",
      value: "95%",
      icon: "📊",
      trend: "+3%",
      description: "Rata-rata nilai 85"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Pendaftaran Baru",
      subject: "Praktikum Asuhan Persalinan Normal",
      timestamp: "5 menit yang lalu",
      status: "pending"
    },
    {
      id: 2,
      action: "Input Nilai",
      subject: "Praktikum Kesehatan Ibu dan Anak",
      timestamp: "10 menit yang lalu",
      status: "completed"
    },
    {
      id: 3,
      action: "Update Jadwal",
      subject: "Praktikum Neonatus",
      timestamp: "30 menit yang lalu",
      status: "updated"
    }
  ];

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Selamat Datang, Admin</h1>
            <p className="text-blue-100 mt-1">Kelola praktikum dengan lebih efisien</p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Buat Praktikum Baru
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              {stat.trend && (
                <span className={`text-sm font-medium ${
                  stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 p-6">
          <h2 className="text-lg font-semibold mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <Button variant="primary" className="w-full justify-between">
              Kelola Jadwal Praktikum
              <span>→</span>
            </Button>
            <Button variant="primary" className="w-full justify-between">
              Input Nilai
              <span>→</span>
            </Button>
            <Button variant="primary" className="w-full justify-between">
              Kelola Laboratorium
              <span>→</span>
            </Button>
            <Button variant="primary" className="w-full justify-between">
              Laporan & Statistik
              <span>→</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start p-4 bg-gray-50 rounded-lg"
              >
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </h4>
                  <p className="text-sm text-gray-500">{activity.subject}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;