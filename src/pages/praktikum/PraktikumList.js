import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import PraktikumCard from '../../components/modules/praktikum/PraktikumCard';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';

const PraktikumList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [praktikumList, setPraktikumList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch praktikum data
    const fetchPraktikum = async () => {
      try {
        // Replace with actual API call
        const mockData = [
          {
            id: 1,
            title: 'Praktikum Basis Data',
            description: 'Pembelajaran tentang perancangan database yang baik',
            schedule: '2025-02-20',
            time: '09:00-11:00',
            room: 'Lab 301',
            dosen: 'Dr. Jane Smith',
            capacity: 30,
            enrolledCount: 25,
            status: 'ongoing'
          },
          {
            id: 2,
            title: 'Praktikum Jaringan Komputer',
            description: 'Pengenalan konsep dasar jaringan komputer',
            schedule: '2025-02-22',
            time: '13:00-15:00',
            room: 'Lab 302',
            dosen: 'Prof. John Doe',
            capacity: 25,
            enrolledCount: 20,
            status: 'upcoming'
          }
        ];
        setPraktikumList(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching praktikum:', error);
        setLoading(false);
      }
    };

    fetchPraktikum();
  }, []);


  const filteredPraktikum = praktikumList.filter(praktikum => {
    const matchesSearch = 
      praktikum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      praktikum.dosen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || praktikum.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Praktikum</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse and manage praktikum sessions
          </p>
        </div>
        {user?.role === 'dosen' && (
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Praktikum
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search praktikum..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Praktikum Grid */}
      {filteredPraktikum.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No praktikum found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPraktikum.map(praktikum => (
            <PraktikumCard
              key={praktikum.id}
              praktikum={praktikum}
            />
          ))}
        </div>
      )}

      {/* Add Praktikum Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Praktikum"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Create Praktikum
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PraktikumList;