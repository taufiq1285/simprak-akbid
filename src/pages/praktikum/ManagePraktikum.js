import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PraktikumForm from '../../components/modules/praktikum/PraktikumForm';
import { praktikumAPI } from '../../utils/api';
import { useNotification } from '../../context/NotificationContext';
import { LoadingContainer } from '../../components/common/LoadingSpinner';

const ManagePraktikum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotification();
  const [praktikum, setPraktikum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPraktikum = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await praktikumAPI.getById(id);
      setPraktikum(response.data);
    } catch (error) {
      setError(error.message || 'Failed to fetch praktikum');
      showError(error.message || 'Failed to fetch praktikum');
    } finally {
      setLoading(false);
    }
  }, [id, showError]);

  useEffect(() => {
    fetchPraktikum();
  }, [fetchPraktikum]);

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await praktikumAPI.update(id, formData);
      } else {
        await praktikumAPI.create(formData);
      }
      navigate('/praktikum');
    } catch (error) {
      showError(error.message || 'Failed to save praktikum');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/praktikum')}
            className="mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Praktikum' : 'Create New Praktikum'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {id ? 'Update praktikum details' : 'Add a new praktikum session'}
          </p>
        </div>
      </div>

      <Card>
        <LoadingContainer loading={loading} error={error}>
          <PraktikumForm
            initialData={praktikum}
            onSubmit={handleSubmit}
          />
        </LoadingContainer>
      </Card>
    </div>
  );
};

export default ManagePraktikum;