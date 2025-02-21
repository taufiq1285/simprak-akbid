import { VALIDATION_RULES } from './constants';

// Basic validators
export const required = value => ({
  isValid: value !== undefined && value !== null && value !== '',
  message: 'This field is required'
});

export const minLength = (min) => (value) => ({
  isValid: !value || value.length >= min,
  message: `Must be at least ${min} characters`
});

export const maxLength = (max) => (value) => ({
  isValid: !value || value.length <= max,
  message: `Must be no more than ${max} characters`
});

export const email = value => ({
  isValid: !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Must be a valid email address'
});

export const numeric = value => ({
  isValid: !value || /^\d+$/.test(value),
  message: 'Must be a number'
});

export const alphanumeric = value => ({
  isValid: !value || /^[a-zA-Z0-9]+$/.test(value),
  message: 'Must be alphanumeric'
});

export const min = (minValue) => (value) => ({
  isValid: !value || parseFloat(value) >= minValue,
  message: `Must be at least ${minValue}`
});

export const max = (maxValue) => (value) => ({
  isValid: !value || parseFloat(value) <= maxValue,
  message: `Must be no more than ${maxValue}`
});

export const pattern = (regex, message) => (value) => ({
  isValid: !value || regex.test(value),
  message
});

// Common validation rules
export const passwordValidation = [
  required,
  minLength(VALIDATION_RULES.PASSWORD_MIN_LENGTH),
  pattern(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&].*$/,
    'Must contain at least one letter and one number'
  )
];

export const emailValidation = [
  required,
  email
];

export const nameValidation = [
  required,
  minLength(VALIDATION_RULES.NAME_MIN_LENGTH),
  maxLength(50)
];

export const phoneValidation = [
  required,
  pattern(
    /^(\+?\d{1,3}[- ]?)?\d{10}$/,
    'Must be a valid phone number'
  )
];

// Helper function to run multiple validators
export const validate = (value, validators) => {
  for (const validator of validators) {
    const result = validator(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true, message: '' };
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const validators = validationRules[field];
    const value = formData[field];
    const result = validate(value, validators);

    if (!result.isValid) {
      errors[field] = result.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Example usage:
// const validationRules = {
//   email: emailValidation,
//   password: passwordValidation,
//   name: nameValidation,
//   phone: phoneValidation
// };
//
// const { isValid, errors } = validateForm(formData, validationRules);