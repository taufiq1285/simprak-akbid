import { GRADE_SCALE, VALIDATION_RULES } from './constants';

// Date formatting
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Time formatting
export const formatTime = (time) => {
  if (!time) return '';
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Grade calculation
export const calculateGrade = (score) => {
  const numScore = parseFloat(score);
  for (const [grade, { min, max }] of Object.entries(GRADE_SCALE)) {
    if (numScore >= min && numScore <= max) return grade;
  }
  return 'E';
};

// Form validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH,
    message: password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH 
      ? `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters` 
      : ''
  };
};

export const validateFile = (file) => {
  if (!file) return { isValid: false, message: 'No file selected' };

  const extension = file.name.split('.').pop().toLowerCase();
  const isValidType = VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(extension);
  const isValidSize = file.size <= VALIDATION_RULES.FILE_MAX_SIZE;

  if (!isValidType) {
    return { 
      isValid: false, 
      message: `Only ${VALIDATION_RULES.ALLOWED_FILE_TYPES.join(', ')} files are allowed` 
    };
  }

  if (!isValidSize) {
    return { 
      isValid: false, 
      message: `File size should not exceed ${formatFileSize(VALIDATION_RULES.FILE_MAX_SIZE)}` 
    };
  }

  return { isValid: true, message: '' };
};

// Calculate final score
export const calculateFinalScore = (scores) => {
  const weights = {
    tugas: 0.2,
    quiz: 0.2,
    uts: 0.3,
    uas: 0.3
  };

  return Object.entries(weights).reduce((total, [type, weight]) => {
    return total + (scores[type] || 0) * weight;
  }, 0);
};

// Local storage management
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Error handling
export const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred';
  }
};

// Array pagination
export const paginateArray = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

// Search and filter
export const filterItems = (items, searchTerm, searchFields) => {
  if (!searchTerm) return items;
  
  return items.filter(item => 
    searchFields.some(field => 
      item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

// Sort items
export const sortItems = (items, field, direction = 'asc') => {
  return [...items].sort((a, b) => {
    if (direction === 'asc') {
      return a[field] > b[field] ? 1 : -1;
    }
    return a[field] < b[field] ? 1 : -1;
  });
};