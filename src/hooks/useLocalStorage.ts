import { useState, useEffect, useRef } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const initialValueRef = useRef<T>(initialValue);

  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        setStoredValue(initialValueRef.current);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(initialValueRef.current));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValueRef.current);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, deleteValue];
}
