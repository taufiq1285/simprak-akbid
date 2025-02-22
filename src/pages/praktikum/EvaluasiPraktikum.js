// src/pages/praktikum/EvaluasiPraktikum.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EvaluasiPraktikum = () => {
  const [selectedPeriode, setSelectedPeriode] = useState('2024-ganjil');

  // Data simulasi
  const evaluasiData = {
    statistik: {
      totalMahasiswa: 45,
      rataRataKehadiran: 92,
      rataRataNilai: 85.5,
      tingkatKelulusan: 95,
    },
    distribusiNilai: {
      'A': 15,
      'B+': 20,
      'B': 5,
      'C+': 3,
      'C': 2,
      'D': 0,
      'E': 0
    },
    trendKehadiran: {
      'Minggu 1': 45,
      'Minggu 2': 43,
      'Minggu 3': 44,
      'Minggu 4': 42,
      'Minggu 5': 41,
      'Minggu 6': 43,
      'Minggu 7': 40,
      'Minggu 8': 42
    },
    kompetensi: [
      {
        aspek: 'Persiapan Alat',
        nilai: 88
      },
      {
        aspek: 'Prosedur Praktikum',
        nilai: 85
      },
      {
        aspek: 'Ketepatan Waktu',
        nilai: 82
      },
      {
        aspek: 'Laporan',
        nilai: 87
      },
      {
        aspek: 'Kerja Tim',
        nilai: 90
      }
    ],
    feedback: [
      {
        mahasiswa: 'Anna Putri',
        pesan: 'Praktikum sangat membantu dalam memahami prosedur persalinan normal',
        rating: 5
      },
      {
        mahasiswa: 'Bella Safitri',
        pesan: 'Alat-alat praktikum lengkap dan kondisi baik',
        rating: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Nilai Praktikum'
      }
    }
  };

  const nilaiChartData = {
    labels: Object.keys(evaluasiData.distribusiNilai),
    datasets: [
      {
        label: 'Jumlah Mahasiswa',
        data: Object.values(evaluasiData.distribusiNilai),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  const kehadiranChartData = {
    labels: Object.keys(evaluasiData.trendKehadiran),
    datasets: [
      {
        label: 'Jumlah Kehadiran',
        data: Object.values(evaluasiData.trendKehadiran),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Evaluasi Praktikum</h1>
              <p className="mt-1 text-sm text-gray-500">
                Analisis dan evaluasi pelaksanaan praktikum
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select
                value={selectedPeriode}
                onChange={(e) => setSelectedPeriode(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="2024-ganjil">Semester Ganjil 2024/2025</option>
                <option value="2023-genap">Semester Genap 2023/2024</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistik Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Mahasiswa</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {evaluasiData.statistik.totalMahasiswa}
            </p>
            <p className="mt-1 text-sm text-gray-500">peserta praktikum</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Rata-rata Kehadiran</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {evaluasiData.statistik.rataRataKehadiran}%
            </p>
            <p className="mt-1 text-sm text-gray-500">tingkat kehadiran</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Rata-rata Nilai</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {evaluasiData.statistik.rataRataNilai}
            </p>
            <p className="mt-1 text-sm text-gray-500">nilai akhir</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Tingkat Kelulusan</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {evaluasiData.statistik.tingkatKelulusan}%
            </p>
            <p className="mt-1 text-sm text-gray-500">mahasiswa lulus</p>
          </Card>
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Distribusi Nilai</h3>
            <Bar options={chartOptions} data={nilaiChartData} />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trend Kehadiran</h3>
            <Bar options={chartOptions} data={kehadiranChartData} />
          </Card>
        </div>

        {/* Evaluasi Kompetensi */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Evaluasi Kompetensi</h3>
          <div className="space-y-4">
            {evaluasiData.kompetensi.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.aspek}</span>
                  <span className="text-blue-600 font-medium">{item.nilai}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.nilai}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Feedback Mahasiswa */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Mahasiswa</h3>
          <div className="space-y-4">
            {evaluasiData.feedback.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.mahasiswa}</p>
                    <p className="text-gray-600 mt-1">{item.pesan}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EvaluasiPraktikum;