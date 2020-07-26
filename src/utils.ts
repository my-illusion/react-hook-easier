export const isString = (arg): arg is string => {
  return typeof arg === 'string';
};

export const isUndefined = (value): value is undefined => {
  return typeof value === undefined;
};

export const isFunction = (value): value is Function => {
  return typeof value === 'function';
};

export function isWindow(obj: any) {
  return obj !== null && obj !== undefined && obj === obj.window
}

export function getScroll(
  target: HTMLElement | Window | Document | null,
  top: Boolean): number {
  if(typeof window === 'undefined'){
    return 0
  }
  const method = top ? 'scrollTop' : 'scrollLeft'
  let result = 0
  if(isWindow(target)){
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset']
  }else if(target instanceof Document){
    result = document.documentElement[method]
  }else if(target){
    result = (target as HTMLElement)[method]
  }
  if(target && !isWindow(target) && typeof result !== 'number'){
    result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement[
      method
    ];
  }
  return result
}

// eslint-disable-next-line import/prefer-default-export
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  // eslint-disable-next-line no-return-assign
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}