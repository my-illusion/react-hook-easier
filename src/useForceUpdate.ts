import { useCallback, useState } from 'react';

const increment = (value: number): number => ++value % 10000;

function useForceUpdate() {
  const [, setState] = useState(0);
  return useCallback(() => {
    setState(increment);
  }, []);
}

export default useForceUpdate;
