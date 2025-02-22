// src/components/praktikum/PraktikumForm.js
import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const PraktikumForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    nama: '',
    kode: '',
    dosen: '',
    jadwal: '',
    ruangan: '',
    kapasitas: '',
    deskripsi: '',
    periode: '',
    status: 'Aktif',
    materi: '',
    persyaratan: '',
    tujuanPembelajaran: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'nama', 'kode', 'dosen', 'jadwal', 'ruangan', 'kapasitas', 'periode'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} wajib diisi`;
      }
    });

    if (formData.kapasitas && (isNaN(formData.kapasitas) || formData.kapasitas < 1)) {
      newErrors.kapasitas = 'Kapasitas harus berupa angka positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Nama Praktikum"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
            required
            placeholder="Masukkan nama praktikum"
          />
        </div>
        <div>
          <Input
            label="Kode Praktikum"
            name="kode"
            value={formData.kode}
            onChange={handleChange}
            error={errors.kode}
            required
            placeholder="Contoh: PKB-001"
          />
        </div>
        <div>
          <Input
            label="Dosen Pengampu"
            name="dosen"
            value={formData.dosen}
            onChange={handleChange}
            error={errors.dosen}
            required
            placeholder="Nama dosen pengampu"
          />
        </div>
        <div>
          <Input
            label="Jadwal"
            name="jadwal"
            type="datetime-local"
            value={formData.jadwal}
            onChange={handleChange}
            error={errors.jadwal}
            required
          />
        </div>
        <div>
          <Input
            label="Ruangan"
            name="ruangan"
            value={formData.ruangan}
            onChange={handleChange}
            error={errors.ruangan}
            required
            placeholder="Pilih ruangan praktikum"
          />
        </div>
        <div>
          <Input
            label="Kapasitas"
            name="kapasitas"
            type="number"
            value={formData.kapasitas}
            onChange={handleChange}
            error={errors.kapasitas}
            required
            placeholder="Jumlah maksimal mahasiswa"
          />
        </div>
        <div>
          <Input
            label="Periode"
            name="periode"
            value={formData.periode}
            onChange={handleChange}
            error={errors.periode}
            required
            placeholder="Contoh: Semester Ganjil 2024/2025"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Aktif">Aktif</option>
            <option value="Pending">Pending</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi Praktikum
        </label>
        <textarea
          name="deskripsi"
          rows="3"
          value={formData.deskripsi}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Deskripsi singkat tentang praktikum"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Materi Praktikum
        </label>
        <textarea
          name="materi"
          rows="3"
          value={formData.materi}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Daftar materi yang akan dipelajari"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Persyaratan
        </label>
        <textarea
          name="persyaratan"
          rows="3"
          value={formData.persyaratan}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Persyaratan untuk mengikuti praktikum"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tujuan Pembelajaran
        </label>
        <textarea
          name="tujuanPembelajaran"
          rows="3"
          value={formData.tujuanPembelajaran}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Tujuan pembelajaran yang ingin dicapai"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default PraktikumForm;