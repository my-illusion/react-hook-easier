import { useCallback, useState } from 'react';

const increment = (value: number): number => ++value % 10000;

function useForceUpdate() {
  const [flag, setState] = useState(0);
  return [
    flag,
    useCallback(() => {
      setState(increment);
    }, []),
  ];
}

export default useForceUpdate;
