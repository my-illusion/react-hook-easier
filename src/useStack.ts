import { useCallback } from 'react';

type StackCursor<T> = { current: T };
const valueStack: any[] = [];
let index = -1;

export default <T = any>() => {
  const createCursor = useCallback(
    (defaultValue: T | null | undefined): StackCursor<T | undefined | null> => {
      return {
        current: defaultValue,
      };
    },
    []
  );
  const isEmpty = useCallback(() => {
    return index === -1;
  }, []);
  const pop = (cursor: StackCursor<T | null | undefined>): void => {
    if (index < 0) {
      cursor.current = null;
      return;
    }
    cursor.current = valueStack[index];
    valueStack[index] = null;
    index--;
  };
  const push = (cursor: StackCursor<T>, value: T): void => {
    if (cursor.current === null || cursor.current === undefined) {
      cursor.current = value;
      return;
    }
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  };
  return {
    createCursor,
    isEmpty,
    pop,
    push,
  };
};
