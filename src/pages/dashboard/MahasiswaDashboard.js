// src/pages/dashboard/MahasiswaDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HealthStatsCard from '../../components/common/HealthStatsCard';
import PraktikumSchedule from '../../components/praktikum/PraktikumSchedule';
import PraktikumGrade from '../../components/praktikum/PraktikumGrade';
import Card from '../../components/common/Card';

const MahasiswaDashboard = () => {
  const { user } = useAuth();

  // Data simulasi untuk development
  const schedules = [
    {
      day: 'Senin',
      title: 'Praktikum Asuhan Kebidanan I',
      time: '08:00 - 10:00',
      location: 'Lab Kebidanan A',
      status: 'Akan Datang',
      participants: 25,
      instructor: 'Dr. Sarah Johnson',
      notes: 'Persiapkan alat pelindung diri lengkap'
    },
    {
      day: 'Rabu',
      title: 'Praktikum Kesehatan Ibu dan Anak',
      time: '13:00 - 15:00',
      location: 'Lab Kebidanan B',
      status: 'Sedang Berlangsung',
      participants: 20,
      instructor: 'Dr. Emily Brown'
    }
  ];

  const grades = [
    {
      title: 'Praktikum Asuhan Kebidanan I',
      period: 'Semester Ganjil 2024/2025',
      finalGrade: 85,
      attendance: 90,
      practical: 85,
      assignments: 88,
      exam: 82,
      feedback: 'Kinerja sangat baik dalam praktik asuhan persalinan normal.'
    },
    {
      title: 'Praktikum Kesehatan Ibu dan Anak',
      period: 'Semester Ganjil 2024/2025',
      finalGrade: 78,
      attendance: 85,
      practical: 75,
      assignments: 80,
      exam: 75
    }
  ];

  const announcements = [
    {
      title: 'Jadwal Ujian Praktikum',
      content: 'Ujian praktikum Asuhan Kebidanan I akan dilaksanakan pada tanggal 25 Februari 2025.',
      date: '2024-02-15',
      priority: 'high'
    },
    {
      title: 'Pengumpulan Laporan',
      content: 'Batas waktu pengumpulan laporan praktikum diperpanjang hingga 20 Februari 2025.',
      date: '2024-02-10',
      priority: 'medium'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold">Selamat Datang, {user?.name}</h1>
          <p className="mt-1 text-primary-100">Semester Ganjil 2024/2025</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HealthStatsCard
            title="Total Praktikum"
            value="4"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <HealthStatsCard
            title="Praktikum Aktif"
            value="2"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            trend="up"
            trendValue="+1"
          />
          <HealthStatsCard
            title="Rata-rata Nilai"
            value="85.5"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            trend="up"
            trendValue="+2.3"
          />
          <HealthStatsCard
            title="Kehadiran"
            value="92%"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jadwal Praktikum */}
          <div className="lg:col-span-2">
            <PraktikumSchedule schedules={schedules} />
          </div>

          {/* Pengumuman */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pengumuman</h2>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      announcement.priority === 'high'
                        ? 'bg-red-50 border border-red-100'
                        : 'bg-blue-50 border border-blue-100'
                    }`}
                  >
                    <h3 className={`text-sm font-medium ${
                      announcement.priority === 'high' ? 'text-red-800' : 'text-blue-800'
                    }`}>
                      {announcement.title}
                    </h3>
                    <p className={`mt-1 text-sm ${
                      announcement.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {announcement.content}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Nilai Praktikum */}
        <PraktikumGrade grades={grades} />
      </div>
    </DashboardLayout>
  );
};

export default MahasiswaDashboard;