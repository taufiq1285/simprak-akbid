import { useState, useCallback } from 'react';
import { validateForm } from '../utils/validation';

const useForm = (initialValues = {}, validationRules = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle field change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur if it has validation rules
    if (validationRules[name]) {
      const { errors: fieldErrors } = validateForm(
        { [name]: values[name] },
        { [name]: validationRules[name] }
      );
      setErrors(prev => ({
        ...prev,
        ...fieldErrors
      }));
    }
  }, [values, validationRules]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  // Validate all fields
  const validateFields = useCallback(() => {
    const { isValid, errors: validationErrors } = validateForm(values, validationRules);
    setErrors(validationErrors);
    return isValid;
  }, [values, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (event) => {
    event?.preventDefault();

    // Mark all fields as touched
    const touchedFields = Object.keys(validationRules).reduce((acc, field) => ({
      ...acc,
      [field]: true
    }), {});
    setTouched(touchedFields);

    // Validate all fields
    const isValid = validateFields();
    
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle submission error
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Form submission failed'
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationRules, validateFields, onSubmit]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    validateFields
  };
};

export default useForm;

// Example usage:
// const validationRules = {
//   email: emailValidation,
//   password: passwordValidation
// };
//
// const { 
//   values, 
//   errors, 
//   touched,
//   isSubmitting,
//   handleChange,
//   handleBlur,
//   handleSubmit
// } = useForm(
//   { email: '', password: '' },
//   validationRules,
//   async (formData) => {
//     // Submit form data
//   }
// );