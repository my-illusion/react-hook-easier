import { useState, useRef, MutableRefObject } from 'react';

export default <T>(
  initialState: T | undefined = undefined
): [MutableRefObject<T | undefined>, any] => {
  const stateRef: MutableRefObject<T | undefined> = useRef(initialState);
  const [state, setState] = useState<T | undefined>(initialState);
  stateRef.current = state;
  return [stateRef, setState];
};
