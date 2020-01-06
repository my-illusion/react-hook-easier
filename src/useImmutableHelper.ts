import { useCallback, MutableRefObject } from 'react';
import update from 'immutability-helper';

import useSetState from './useSetState';

function useImmutableHelper<T = any>(
  initialState: T
): [MutableRefObject<T | undefined>, Function] {
  const [state, setState] = useSetState<T>(initialState);
  const dispatch = useCallback(params => {
    setState(state => update(state, params));
  }, []);
  return [state, dispatch];
}

export default useImmutableHelper;
