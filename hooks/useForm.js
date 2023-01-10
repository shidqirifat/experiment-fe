import { useState } from 'react';

export default function useForm(initForm) {
  const [form, setForm] = useState(initForm);

  const handleChange = (e, isNumber = false) => {
    const { name, value } = e.target;
    if (isNumber && value !== '' && isNaN(value)) return;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const resetForm = () => setForm(initForm);

  return { form, handleChange, resetForm };
}
