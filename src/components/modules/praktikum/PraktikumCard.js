// src/components/modules/praktikum/PraktikumCard.js
import React from 'react';
import Button from '../../common/Button';

const PraktikumCard = ({ praktikum, role, onAction }) => {
  const getStatusBadgeColor = (status) => {
    const colors = {
      'Aktif': 'bg-green-100 text-green-800',
      'Selesai': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Ditolak': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getActionButton = () => {
    switch (role) {
      case 'admin':
        return (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => onAction('edit', praktikum)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="text-sm"
              onClick={() => onAction('delete', praktikum)}
            >
              Hapus
            </Button>
          </div>
        );
      case 'dosen':
        return (
          <div className="flex space-x-2">
            <Button
              variant="primary"
              className="text-sm"
              onClick={() => onAction('nilai', praktikum)}
            >
              Input Nilai
            </Button>
            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => onAction('detail', praktikum)}
            >
              Detail
            </Button>
          </div>
        );
      case 'mahasiswa':
        return (
          <Button
            variant="primary"
            className="text-sm"
            onClick={() => onAction('daftar', praktikum)}
            disabled={praktikum.status !== 'Aktif'}
          >
            {praktikum.status === 'Aktif' ? 'Daftar' : 'Tidak Tersedia'}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{praktikum.nama}</h3>
          <p className="mt-1 text-sm text-gray-500">{praktikum.kodePraktikum}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(praktikum.status)}`}>
          {praktikum.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Dosen:</span> {praktikum.dosen}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Jadwal:</span> {praktikum.jadwal}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Ruangan:</span> {praktikum.ruangan}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Kapasitas:</span> {praktikum.kapasitas} mahasiswa
        </p>
      </div>

      <div className="mt-6">
        {getActionButton()}
      </div>
    </div>
  );
};

export default PraktikumCard;