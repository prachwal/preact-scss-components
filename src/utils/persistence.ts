/**
 * Universal localStorage persistence utility
 * Provides reactive persistence for any signal value
 */

import { signal, effect } from '@preact/signals';

// Generic type for persisted values
export type PersistedValue<T> = {
  value: T;
  set: (value: T) => void;
  reset: () => void;
};

/**
 * Creates a persisted signal that automatically syncs with localStorage
 * @param key - localStorage key
 * @param defaultValue - default value if not found in localStorage
 * @param serializer - optional custom serializer function
 * @param deserializer - optional custom deserializer function
 * @returns PersistedValue object with reactive value and control methods
 */
export function createPersistedSignal<T>(
  key: string,
  defaultValue: T,
  serializer: (value: T) => string = JSON.stringify,
  deserializer: (value: string) => T = JSON.parse
): PersistedValue<T> {
  // Initialize value from localStorage or default
  const getInitialValue = (): T => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? deserializer(stored) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  // Create the signal with initial value
  const valueSignal = signal<T>(getInitialValue());

  // Effect to persist changes to localStorage
  effect(() => {
    if (typeof window === 'undefined') return;

    try {
      const currentValue = valueSignal.value;
      if (currentValue === defaultValue) {
        // If value is default, remove from localStorage to keep it clean
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializer(currentValue));
      }
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  });

  // Return the persisted value interface
  return {
    get value() {
      return valueSignal.value;
    },
    set value(newValue: T) {
      valueSignal.value = newValue;
    },
    set: (value: T) => {
      valueSignal.value = value;
    },
    reset: () => {
      valueSignal.value = defaultValue;
    }
  };
}

/**
 * Creates a persisted signal for simple values (string, number, boolean)
 * @param key - localStorage key
 * @param defaultValue - default value
 * @returns PersistedValue object
 */
export function createPersistedPrimitive<T extends string | number | boolean>(
  key: string,
  defaultValue: T
): PersistedValue<T> {
  return createPersistedSignal(
    key,
    defaultValue,
    (value) => String(value),
    (value) => {
      if (typeof defaultValue === 'boolean') {
        return (value === 'true') as T;
      }
      if (typeof defaultValue === 'number') {
        const parsed = parseFloat(value);
        return (isNaN(parsed) ? defaultValue : parsed) as T;
      }
      return value as T;
    }
  );
}

/**
 * Hook for using persisted values in components
 * @param key - localStorage key
 * @param defaultValue - default value
 * @returns tuple of [value, setValue, reset]
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, () => void] {
  const persisted = createPersistedSignal(key, defaultValue);

  return [
    persisted.value,
    persisted.set,
    persisted.reset
  ];
}