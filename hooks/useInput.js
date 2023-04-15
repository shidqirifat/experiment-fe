import { useState } from 'react';

export default function useInput(initInput) {
  const [input, setInput] = useState(initInput);

  const handleChange = (e, isNumber = false) => {
    const { name, value } = e.target;
    if (isNumber && value !== '' && isNaN(value)) return;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const resetInput = () => setInput(initInput);

  return { input, handleChange, resetInput };
}
