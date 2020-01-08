export { default as createMemo } from './createMemo';

export { default as useAntdTableColumn } from './useAntdTableColumn';

export { default as useCache } from './useCache';

export { default as usePagination } from './usePagination';

export { default as useFetch } from './useFetch';

export { default as useScrollPenetration } from './useScrollPenetration';

export { default as useUpdateEffect } from './useUpdateEffect';

export { default as useResize } from './useResize';

export { default as useSetState } from './useSetState';

export { default as useFetchQueue } from './useFetchQueue';

export { default as useThrottle } from './useThrottle';

export { default as useDebounce } from './useDebounce';

export { default as useForceUpdate } from './useForceUpdate';

export { default as useImmer } from './useImmer';

export { default as useImageToBase64 } from './useImageToBase64';

export { default as useImmutableHelper } from './useImmutableHelper';

export { default as useEventEmitter } from './useEventEmitter';

export * from './useInjectContext';

// const modulesFiles = require.context("./", true, /\.js$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

// module.exports = modules;
