function useThrottle(fn, delay: number) {
  let time: number | undefined = undefined;
  let previous = 0;
  return function(...args) {
    let that = this;
    let now = Date.now();
    clearTimeout(time);
    let remaining = delay - (now - previous);
    if (remaining <= 0) {
      fn.apply(that, ...args);
      previous = now;
    } else {
      time = setTimeout(() => {
        fn.apply(that, ...args);
      }, remaining);
    }
  };
}

export default useThrottle;
