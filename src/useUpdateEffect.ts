import { useEffect, useRef, useLayoutEffect } from 'react';

type RefObject<T> = {
  current: T | null;
};

export default (
  fn: () => any,
  dep: any[] = [],
  type: 'effect' | 'layoutEffect' = 'effect'
) => {
  const updateRef: RefObject<boolean> = useRef(false);
  const useDecisionEffect = type === 'effect' ? useEffect : useLayoutEffect;

  useDecisionEffect(() => {
    if (updateRef.current === false) {
      updateRef.current = true;
      return;
    }
    const destroy = fn();
    return () => {
      destroy && destroy();
    };
  }, [...dep]);
};
