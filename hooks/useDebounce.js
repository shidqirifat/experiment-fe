import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
  const [debaunceValue, setDebaunceValue] = useState();

  useEffect(() => {
    const handler = setTimeout(() => setDebaunceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debaunceValue;
}
