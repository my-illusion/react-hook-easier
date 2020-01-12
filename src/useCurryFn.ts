const useCurryFn = (fn: Function) => {
  let curry: Function;
  return (curry = prev =>
    function(...args: any[]) {
      return prev.concat(args).length >= fn.length
        ? fn.apply(this, prev.concat(args))
        : curry(prev.concat(args));
    })([]);
};

export default useCurryFn;
