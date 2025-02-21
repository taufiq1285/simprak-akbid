// src/pages/dashboard/DosenDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HealthStatsCard from '../../components/common/HealthStatsCard';
import PraktikumSchedule from '../../components/praktikum/PraktikumSchedule';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DosenDashboard = () => {
  const { user } = useAuth();

  // Data simulasi untuk pengembangan
  const schedules = [
    {
      day: 'Senin',
      title: 'Praktikum Asuhan Kebidanan I',
      time: '08:00 - 10:00',
      location: 'Lab Kebidanan A',
      status: 'Akan Datang',
      participants: 25,
      instructor: 'Dr. Sarah Johnson',
      notes: 'Persiapkan alat peraga persalinan'
    },
    {
      day: 'Rabu',
      title: 'Praktikum Kesehatan Ibu dan Anak',
      time: '13:00 - 15:00',
      location: 'Lab Kebidanan B',
      status: 'Sedang Berlangsung',
      participants: 20,
      instructor: 'Dr. Sarah Johnson'
    }
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Input Nilai Praktikum Asuhan Kebidanan I',
      deadline: '2025-02-25',
      count: 25,
      type: 'nilai'
    },
    {
      id: 2,
      title: 'Review Laporan Praktikum KIA',
      deadline: '2025-02-20',
      count: 15,
      type: 'laporan'
    }
  ];

  const studentProgress = [
    {
      name: 'Ana Putri',
      nim: '2024001',
      progress: 85,
      status: 'Sangat Baik'
    },
    {
      name: 'Bella Safitri',
      nim: '2024002',
      progress: 75,
      status: 'Baik'
    },
    {
      name: 'Citra Dewi',
      nim: '2024003',
      progress: 65,
      status: 'Cukup'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold">Selamat Datang, {user?.name}</h1>
          <p className="mt-1 text-primary-100">Dosen Pembimbing Praktikum</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HealthStatsCard
            title="Total Mahasiswa"
            value="60"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <HealthStatsCard
            title="Kelas Aktif"
            value="3"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <HealthStatsCard
            title="Nilai Belum Diinput"
            value="25"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            trend="down"
            trendValue="-5"
          />
          <HealthStatsCard
            title="Rata-rata Kehadiran"
            value="92%"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            trend="up"
            trendValue="+2%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jadwal Praktikum */}
          <div className="lg:col-span-2">
            <PraktikumSchedule schedules={schedules} />
          </div>

          {/* Tugas Pending */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Tugas Pending</h2>
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </div>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500">
                          Deadline: {new Date(task.deadline).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {task.count} {task.type === 'nilai' ? 'mahasiswa' : 'laporan'}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        Kerjakan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Progress Mahasiswa */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Progress Mahasiswa</h2>
            <Button variant="outline" size="sm">
              Lihat Semua Mahasiswa
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Mahasiswa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NIM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentProgress.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.nim}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.progress >= 80 ? 'bg-green-100 text-green-800' :
                        student.progress >= 70 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DosenDashboard;