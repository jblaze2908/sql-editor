import { useState } from "react";

export function useLocalStorage<T>(keyName: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value) as T;
      }
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  function setValue(newValue: T) {
    setStoredValue(newValue);
    saveToLocalStorage(newValue);
  }
  function setValueBasedOnPreviousValue(func: (val: T) => T) {
    const previousValue = storedValue;
    const newValue = func(previousValue);
    setStoredValue(newValue);
    saveToLocalStorage(newValue);
  }
  function saveToLocalStorage(value: T) {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }
  return { storedValue, setValue, setValueBasedOnPreviousValue };
}
