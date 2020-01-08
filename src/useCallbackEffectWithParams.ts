import { useCallback, useEffect, useRef } from 'react';

function useCallbackEffectWithParams(
  callback,
  dep = [],
  pendingParams = undefined
) {
  const callbackImpl = useCallback(params => callback(params), []);

  const cbRef = useRef(callbackImpl(pendingParams));

  useEffect(() => {
    cbRef.current(...dep);
  }, [...dep]);

  return param => {
    cbRef.current = callbackImpl(param);
  };
}

export default useCallbackEffectWithParams;
