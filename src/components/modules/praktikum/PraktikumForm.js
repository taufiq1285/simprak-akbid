import React from 'react';
import { useForm } from '../../../hooks/useForm';
import Input from '../../common/Input';
import Button from '../../common/Button';
import FileUpload from '../../common/FileUpload';
import { useNotification } from '../../../context/NotificationContext';

const PraktikumForm = ({ initialData = null, onSubmit }) => {
  const { showSuccess, showError } = useNotification();

  const validationRules = {
    title: [(value) => ({
      isValid: value && value.length >= 3,
      message: 'Title must be at least 3 characters'
    })],
    description: [(value) => ({
      isValid: value && value.length >= 10,
      message: 'Description must be at least 10 characters'
    })],
    room: [(value) => ({
      isValid: !!value,
      message: 'Room is required'
    })],
    capacity: [(value) => ({
      isValid: value && parseInt(value) > 0,
      message: 'Capacity must be greater than 0'
    })]
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useForm(
    initialData || {
      title: '',
      description: '',
      schedule: '',
      time: '',
      room: '',
      capacity: '',
      materials: []
    },
    validationRules,
    async (formData) => {
      try {
        await onSubmit(formData);
        showSuccess('Praktikum saved successfully');
      } catch (error) {
        showError(error.message || 'Failed to save praktikum');
        throw error;
      }
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Schedule Date"
          type="date"
          name="schedule"
          value={values.schedule}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.schedule}
          required
        />

        <Input
          label="Schedule Time"
          type="time"
          name="time"
          value={values.time}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.time}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Room"
          name="room"
          value={values.room}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.room}
          required
        />

        <Input
          label="Capacity"
          type="number"
          name="capacity"
          value={values.capacity}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.capacity}
          required
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          className={`
            w-full rounded-md shadow-sm 
            ${errors.description 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
          `}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Materials
        </label>
        <FileUpload
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          multiple
          onUpload={(files) => {
            handleChange({
              target: {
                name: 'materials',
                value: [...(values.materials || []), ...files]
              }
            });
          }}
          onRemove={(file) => {
            handleChange({
              target: {
                name: 'materials',
                value: values.materials.filter(f => f !== file)
              }
            });
          }}
          value={values.materials}
          error={errors.materials}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default PraktikumForm;