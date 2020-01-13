import { useMemo } from 'react';

const useWebWorker = (fn: Function) => {
  const worker = useMemo(() => {
    const blob = new Blob(['(' + fn.toString() + ')()']);
    const url = window.URL.createObjectURL(blob);
    const workerTemp = new Worker(url);
    window.URL.revokeObjectURL(url);
    return workerTemp;
  }, [fn]);
  return worker;
};

export default useWebWorker;
