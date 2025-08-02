// src/hooks/useForm.js
import { useState, useCallback } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Xóa lỗi ngay khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (callback) => {
    setIsSubmitting(true);
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await callback(values); // Thực thi callback nếu form hợp lệ
      } catch (error) {
        console.error("Form submission error:", error);
        // Có thể thêm logic xử lý lỗi cụ thể ở đây nếu cần
      }
    }
    setIsSubmitting(false);
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    setValues, // Đôi khi cần setValues trực tiếp
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    setErrors // Đôi khi cần setErrors từ bên ngoài (ví dụ: lỗi từ API)
  };
};

export default useForm;