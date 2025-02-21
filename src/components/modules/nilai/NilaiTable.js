import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Download } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const NilaiTable = ({ 
  data = [], 
  isEditable = false, 
  onSaveNilai,
  praktikumInfo
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filteredData, setFilteredData] = useState(data);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nim.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredData(sorted);
  };

  const calculateFinalGrade = (row) => {
    const weights = {
      tugas: 0.2,
      quiz: 0.2,
      uts: 0.3,
      uas: 0.3
    };
    
    return (
      (row.tugas * weights.tugas) +
      (row.quiz * weights.quiz) +
      (row.uts * weights.uts) +
      (row.uas * weights.uas)
    ).toFixed(2);
  };

  const getGradeLetter = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 85) return 'A';
    if (numScore >= 75) return 'B';
    if (numScore >= 65) return 'C';
    if (numScore >= 50) return 'D';
    return 'E';
  };

  const handleCellEdit = (rowIndex, field, value) => {
    if (!isEditable) return;
    setEditingCell({ rowIndex, field });
    setEditValue(value.toString());
  };

  const handleCellSave = async (rowIndex, field) => {
    if (!isEditable) return;
    const numValue = parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      alert('Nilai harus berupa angka antara 0-100');
      return;
    }

    try {
      await onSaveNilai(filteredData[rowIndex].id, field, numValue);
      const newData = [...filteredData];
      newData[rowIndex][field] = numValue;
      setFilteredData(newData);
      setEditingCell(null);
      setEditValue('');
    } catch (error) {
      alert('Gagal menyimpan nilai');
    }
  };

  const handleExportExcel = () => {
    // Implement Excel export functionality
    console.log('Exporting to Excel...');
  };

  return (
    <Card>
      <div className="space-y-4">
        {/* Header Info */}
        {praktikumInfo && (
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {praktikumInfo.title}
              </h3>
              <p className="text-sm text-gray-500">
                Dosen: {praktikumInfo.dosen}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleExportExcel}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau NIM..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('nim')}
                >
                  <div className="flex items-center">
                    NIM
                    {sortConfig.key === 'nim' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Nama
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                {['tugas', 'quiz', 'uts', 'uas'].map((field) => (
                  <th 
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {field.toUpperCase()}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai Akhir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, rowIndex) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.nim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.name}
                  </td>
                  {['tugas', 'quiz', 'uts', 'uas'].map((field) => (
                    <td 
                      key={field}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      onClick={() => handleCellEdit(rowIndex, field, row[field])}
                    >
                      {editingCell?.rowIndex === rowIndex && editingCell?.field === field ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-20 px-2 py-1 border rounded-md"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleCellSave(rowIndex, field)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleCellSave(rowIndex, field);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className={isEditable ? 'cursor-pointer hover:bg-gray-100 px-2 py-1 rounded' : ''}>
                          {row[field]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {calculateFinalGrade(row)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {getGradeLetter(calculateFinalGrade(row))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default NilaiTable;