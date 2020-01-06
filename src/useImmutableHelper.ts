import { useCallback } from 'react';
import update from 'immutability-helper';

import useSetState from './useSetState';

function useImmutableHelper<T = any>(
  initialState: T
): [T | undefined, Function] {
  const [state, setState] = useSetState<T>(initialState);
  const dispatch = useCallback(params => {
    setState(state => update(state, params));
  }, []);
  return [state.current, dispatch];
}

export default useImmutableHelper;
