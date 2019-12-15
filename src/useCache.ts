interface IConfig {
  mapType?: 'Map' | 'WeakMap';
}

const useCache = <IKey, ICache>({ mapType = 'Map' }: IConfig) =>
  (cacheMap => (key: IKey, cacheValue: ICache): ICache | undefined => {
    if (!cacheMap.get(key)) {
      cacheMap.set(key, cacheValue);
    }
    return cacheMap.get(key);
  })(mapType === 'Map' ? new Map<IKey, ICache>() : new WeakMap<any, ICache>());

export default useCache;
