import { useCallback } from 'react';
import update from 'immutability-helper';

import useSetState from './useSetState';

function useImmutableHelper<T = any>(initialState: T): [T, Function] {
  const [state, setState] = useSetState(initialState);
  return [
    state as any,
    useCallback(params => {
      setState(state => update(state, params));
    }, []),
  ];
}

export default useImmutableHelper;
