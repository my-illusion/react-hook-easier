import { useContext, useState, useEffect } from 'react';

import { http } from './lib';
import fetchConfigContext from './fetchConfigContext';

const enum methodEnum {
  'POST',
  'GET',
}

interface IProps {
  method: methodEnum;
  url: string | (() => string | never);
  param?: unknown;
  fallback?: unknown;
  dependency?: unknown[];
  callback?: (...args: unknown[]) => unknown;
  fetcher: (...args: unknown[]) => Promise<any>;
}

const handler = (config: IProps): boolean | string => {
  const { url, param } = config;
  if (param === null) return false;
  if (typeof url === 'function') {
    try {
      return url();
    } catch (err) {
      return false;
    }
  }
  return url;
};

const defaultConfig = {
  fetcher: args => {
    return (async () => {
      const { method, param, fallback } = args;
      const finalUrl = handler(args);
      if (typeof finalUrl === 'boolean') {
        return fallback;
      }

      try {
        const result = await http[method](finalUrl, param);
        return result;
      } catch (err) {
        return fallback;
      }
    })();
  },
  method: methodEnum.GET,
  url: () => {
    throw new Error('error');
  },
};

const useFetch = (args: IProps) => {
  const { dependency = [], callback, ...fetchArgs } = args;
  const mergeConfig: IProps = Object.assign(
    {},
    defaultConfig,
    useContext(fetchConfigContext)
  );

  const fn = mergeConfig.fetcher;

  const [data, setData] = useState(fetchArgs.fallback);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fn(fetchArgs);
      setData(result);
      setLoading(false);
      callback && callback(result);
    })();
  }, [...dependency]);

  return {
    data,
    loading,
  };
};

export default useFetch;
