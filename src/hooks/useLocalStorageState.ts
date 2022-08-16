import { useEffect, useState } from 'react';

function useLocalStorageState<T>(
  initialState: T,
  localStorageKey: string
): [T, (newState: T) => void] {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fromStorage = window.localStorage.getItem(localStorageKey);
    if (fromStorage !== null) {
      setState(JSON.parse(fromStorage));
    }
  });

  const setStateAndStore = (newState: T) => {
    setState(newState);
    window.localStorage.setItem(localStorageKey, JSON.stringify(newState));
  };

  return [state, setStateAndStore];
}

export default useLocalStorageState;
