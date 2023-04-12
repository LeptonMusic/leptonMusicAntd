import { useState, useCallback } from 'react';

export default () => {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  const changeName = useCallback((a: string) => setName((b) => a), []);
  return { name, counter, increment, decrement, changeName };
};