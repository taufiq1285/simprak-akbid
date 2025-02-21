import React, { useState, useRef } from 'react';
import { Upload, X, File, FileText, Image } from 'lucide-react';
import { validateFile } from '../../utils/helpers';
import { VALIDATION_RULES } from '../../utils/constants';

const FileUpload = ({
  accept = '*',
  maxSize = VALIDATION_RULES.FILE_MAX_SIZE,
  multiple = false,
  onUpload,
  onRemove,
  value = null,
  error = null,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(value ? [value] : []);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter((file) => {
      const validation = validateFile(file);
      return validation.isValid;
    });

    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      onUpload?.(validFiles);
    } else {
      setFiles([validFiles[0]]);
      onUpload?.(validFiles[0]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    onRemove?.(fileToRemove);
  };

  const getFileIcon = (file) => {
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image':
        return <Image className="h-8 w-8 text-blue-500" />;
      case 'application':
        return <FileText className="h-8 w-8 text-blue-500" />;
      default:
        return <File className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <div className={className}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
        />

        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => fileInputRef.current?.click()}
            >
              Click to upload
            </button>{' '}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {accept === '*'
              ? 'Any file type'
              : `${accept.split(',').join(', ')} files`}{' '}
            up to {(maxSize / (1024 * 1024)).toFixed(0)}MB
          </p>
        </div>

        {/* Preview */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center">
                  {getFileIcon(file)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => removeFile(file)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;