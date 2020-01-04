function useDebounce(fn: Function, delay: number, immediate: boolean) {
  let time: number | undefined = undefined;
  return function(...args) {
    let that = this;
    if (immediate && !time) {
      fn.apply(that, args);
    }
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}

export default useDebounce;
