interface IConfig {
  mapType?: 'Map' | 'WeakMap';
}

const useCache = <IKey, ICache>({ mapType = 'Map' }: IConfig) =>
  (cacheMap => (
    key: IKey,
    cacheValue: ICache | undefined = undefined
  ): ICache | undefined => {
    if (!cacheMap.get(key) || cacheValue !== undefined) {
      cacheMap.set(key, cacheValue as ICache);
    }
    return cacheMap.get(key);
  })(mapType === 'Map' ? new Map<IKey, ICache>() : new WeakMap<any, ICache>());

export default useCache;
