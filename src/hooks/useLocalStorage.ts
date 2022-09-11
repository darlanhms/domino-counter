import React, { useEffect, useState } from 'react';

// [value, setValue]
type UseLocalStorageReturn<T> = [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];

export default function useLocalStorage<T>(key: string, defaultValue?: T): UseLocalStorageReturn<T> {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storageValue = localStorage.getItem(key);

    let finalValue: T | undefined;

    if (storageValue) {
      try {
        finalValue = JSON.parse(storageValue);
      } catch (error) {
        if (Number(storageValue)) {
          finalValue = Number(storageValue) as any;
        } else {
          finalValue = (storageValue || undefined) as any;
        }
      }
    }

    if (finalValue || defaultValue) {
      setValue(finalValue || defaultValue);
    }
  }, []);

  useEffect(() => {
    if (!value) {
      localStorage.removeItem(key);
      return;
    }

    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value as string);
    }
  }, [value]);

  return [value, setValue];
}
