import { useState } from "react";

// This hook works just like useState, but it also saves the value
// to localStorage so it doesn't disappear when the page refreshes
export function useLocalStorage(key, initialValue) {
  console.log("useLocalStorage hook called with key:", key);

  // Step 1: Try to load existing data from localStorage first
  const [storedValue, setStoredValue] = useState(function () {
    try {
      const existingItem = localStorage.getItem(key);
      console.log(
        "Loading from localStorage, key:",
        key,
        "found:",
        existingItem,
      );

      if (existingItem) {
        return JSON.parse(existingItem);
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // Step 2: Create a setter that saves to localStorage AND updates state
  function setValue(newValue) {
    try {
      console.log("Saving to localStorage, key:", key, "value:", newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.log("Error saving to localStorage:", error);
    }
  }

  return [storedValue, setValue];
}
