import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Book, 
  FileText,
  Download,
  Upload,
  ChevronLeft 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';

const PraktikumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [praktikum, setPraktikum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPraktikum = async () => {
      try {
        // Replace with actual API call
        const mockData = {
          id,
          title: 'Praktikum Basis Data',
          description: 'Pembelajaran tentang perancangan database yang baik dan benar. Mahasiswa akan belajar tentang normalisasi, relasi, dan query.',
          schedule: '2025-02-20',
          time: '09:00-11:00',
          room: 'Lab 301',
          dosen: 'Dr. Jane Smith',
          capacity: 30,
          enrolledCount: 25,
          status: 'ongoing',
          materials: [
            { id: 1, title: 'Modul 1 - Pengenalan Database', size: '2.5 MB' },
            { id: 2, title: 'Modul 2 - Normalisasi', size: '3.1 MB' },
            { id: 3, title: 'Modul 3 - Query Dasar', size: '1.8 MB' }
          ],
          assignments: [
            { 
              id: 1, 
              title: 'Tugas 1 - ERD',
              deadline: '2025-02-25',
              submitted: true
            },
            {
              id: 2,
              title: 'Tugas 2 - Normalisasi',
              deadline: '2025-03-05',
              submitted: false
            }
          ]
        };
        setPraktikum(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching praktikum:', error);
        setLoading(false);
      }
    };

    fetchPraktikum();
  }, [id]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!selectedFile) return;

    try {
      // Replace with actual API call
      console.log('Uploading file:', selectedFile);
      setIsUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!praktikum) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Praktikum not found</h2>
        <p className="mt-2 text-gray-500">The praktikum you're looking for doesn't exist.</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => navigate('/praktikum')}
        >
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/praktikum')}
          className="mb-4"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to List
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{praktikum.title}</h1>
            <p className="mt-1 text-gray-500">
              Dibimbing oleh {praktikum.dosen}
            </p>
          </div>
          {user?.role === 'mahasiswa' && (
            <Button variant="primary">
              Enroll Now
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card title="Description">
            <p className="text-gray-600">{praktikum.description}</p>
          </Card>

          {/* Materials */}
          <Card title="Learning Materials">
            <div className="space-y-4">
              {praktikum.materials.map((material) => (
                <div 
                  key={material.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {material.title}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({material.size})
                    </span>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Assignments */}
          <Card title="Assignments">
            <div className="space-y-4">
              {praktikum.assignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {assignment.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Due: {assignment.deadline}
                    </p>
                  </div>
                  <Button
                    variant={assignment.submitted ? "success" : "primary"}
                    size="sm"
                    onClick={() => !assignment.submitted && setIsUploadModalOpen(true)}
                  >
                    {assignment.submitted ? (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schedule Info */}
          <Card title="Schedule Information">
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-5 w-5 mr-3" />
                {praktikum.schedule}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-5 w-5 mr-3" />
                {praktikum.time}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-5 w-5 mr-3" />
                {praktikum.room}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-5 w-5 mr-3" />
                {praktikum.enrolledCount} / {praktikum.capacity} students
              </div>
            </div>
          </Card>

          {/* Progress (for students) */}
          {user?.role === 'mahasiswa' && (
            <Card title="Your Progress">
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        In Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        70%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: "70%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setSelectedFile(null);
        }}
        title="Submit Assignment"
      >
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              setSelectedFile(file);
            }}
          >
            {selectedFile ? (
              <div className="space-y-2">
                <FileText className="mx-auto h-12 w-12 text-blue-500" />
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your file here, or{' '}
                  <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {' '}to upload
                </p>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsUploadModalOpen(false);
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!selectedFile}
              onClick={handleSubmitAssignment}
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PraktikumDetail;