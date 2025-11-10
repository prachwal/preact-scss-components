/**
 * Example usage of the persistence utility
 * This file demonstrates how to use the universal localStorage persistence mechanism
 */

import { createPersistedSignal, createPersistedPrimitive, usePersistedState } from '../utils/persistence';

// Example 1: Persisted theme preference (already used in ThemeProvider)
const themePreference = createPersistedSignal('user-theme', 'system' as 'light' | 'dark' | 'system');

// Example 2: Persisted user settings
const userSettings = createPersistedSignal('user-settings', {
  notifications: true,
  language: 'pl',
  fontSize: 16
});

// Example 3: Persisted primitive values
const isLoggedIn = createPersistedPrimitive('is-logged-in', false);
const userId = createPersistedPrimitive('user-id', 0);
const username = createPersistedPrimitive('username', '');

// Example 4: Using in a component (pseudo-code)
/*
function MyComponent() {
  const [counter, setCounter, resetCounter] = usePersistedState('counter', 0);
  const [name, setName, resetName] = usePersistedState('user-name', '');

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={resetCounter}>Reset</button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={resetName}>Clear name</button>
    </div>
  );
}
*/

export {
  themePreference,
  userSettings,
  isLoggedIn,
  userId,
  username
};