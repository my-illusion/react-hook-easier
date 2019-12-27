import { useRef, useState, useCallback, useEffect } from 'react';

import { createSelector } from './lib/';

export const STRING_CHANGE_TYPE = 'string_change';

export const CHANGE_TYPE = 'change';

export const UNDO_TYPE = 'undo_type';

export const REDO_TYPE = 'redo_type';

export const FETCH_TYPE = 'fetch_type';

class Stack extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  constructor(...args) {
    super(...args)
  }

  get size() {
    return this.size;
  }

  set size(size) {
    this.size = size;
  }
}

const cacheStateStack: Stack = new Stack();

const cacheSelectors = new WeakMap();

const getFinalAction = action => {
  return typeof action === 'string'
    ? {
      type: STRING_CHANGE_TYPE,
      payload: action,
    }
    : {
      ...action,
      type: action.type || CHANGE_TYPE,
    };
};

const defaultReducer = (state, action) => {
  const finalAction = getFinalAction(action);
  let result = null;

  try {
    switch (finalAction.type) {
      case STRING_CHANGE_TYPE:
        result = {
          ...state,
          [finalAction.payload.split(':')[0]]: finalAction.payload.split(
            ':'
          )[1],
        };

        cacheStateStack.length =
          cacheStateStack.size + 1 || cacheStateStack.length;
        cacheStateStack.push(result);
        cacheStateStack.size = cacheStateStack.length - 1;
        return result;

      case CHANGE_TYPE:
        result = {
          ...state,
          [action.field]: action.payload,
        };

        cacheStateStack.length =
          cacheStateStack.size + 1 || cacheStateStack.length;
        cacheStateStack.push(result);
        cacheStateStack.size = cacheStateStack.length - 1;
        return result;

      case UNDO_TYPE:
        cacheStateStack.size--;
        if (cacheStateStack.size < 0) cacheStateStack.size++;
        return cacheStateStack[cacheStateStack.size];

      case REDO_TYPE:
        cacheStateStack.size++;
        if (cacheStateStack.size > cacheStateStack.length - 1)
          cacheStateStack.size--;
        return cacheStateStack[cacheStateStack.size];

      default:
        return state;
    }
  } catch (_) {
    return state;
  }
};

const cacheState = new WeakMap();

const getMergeState = (fields, defaultState) => {
  if (cacheState.has(fields)) {
    return cacheState.get(fields);
  } else {
    const mergeState = fields.reduce(
      (prev, next) => ({ ...prev, [next]: defaultState[next] }),
      {}
    );
    cacheState.set(fields, mergeState);
    return mergeState;
  }
};

const composeMiddlewares = (chain: any[] = []): any => {
  return (context, dispatch) => {
    return chain.reduceRight((res, middelware: (...args: any) => any) => {
      return middelware(context)(res);
    }, dispatch);
  };
};

const createReducer = (...middelwares) => {
  const composeMiddleware = composeMiddlewares(middelwares);
  return (
    reducer = defaultReducer,
    initialState,
    initializer = value => value
  ) => {
    const ref = useRef(initializer(initialState));
    const [, setState] = useState(ref.current);
    //
    const dispatch = useCallback(
      action => {
        ref.current = reducer(ref.current, action);
        setState(ref.current);
        return action;
      },
      [reducer]
    );

    //
    const dispatchRef = useRef(
      composeMiddleware(
        {
          getState: () => ref.current,
          dispatch: (...args) => dispatchRef.current(...args),
        },
        dispatch
      )
    );

    useEffect(() => {
      cacheStateStack.push(ref.current);
    }, []);

    // TODO... dispatch更新的时候需要同步更新 dispatchRef
    return [ref.current, dispatchRef.current];
  };
};

export default ({ fields = [], defaultState = {}, middelwares = [] } = {}) => {
  const mergeState = getMergeState(fields, defaultState);
  return createReducer(...middelwares)(defaultReducer, mergeState);
};

export const thunkMiddleware = ({ getState, dispatch }) => next => action => {
  if (typeof action === 'function') {
    action(getState, dispatch);
  } else {
    next(action);
  }
};

// 获取数据的中间件,整合reselect的功能
export const fetchMiddleware = ({ getState }) => next => action => {
  if (typeof action !== 'string' && action.type === FETCH_TYPE) {
    let selector: any = null;

    if (cacheSelectors.has(action.selectorOptions)) {
      selector = cacheSelectors.get(action.selectorOptions);
    } else {
      selector = (createSelector as any)(...action.selectorOptions);
      cacheSelectors.set(action.selectorOptions, selector);
    }

    const state = getState();
    action.callback && action.callback(selector(state));
  } else {
    next(action);
  }
};
