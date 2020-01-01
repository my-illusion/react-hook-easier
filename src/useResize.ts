import { useLayoutEffect, useState, useRef, MutableRefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Size = { width?: number; height?: number };
type Element<T> = T | null;

function useResize<T extends HTMLElement = HTMLElement>(): [Size, MutableRefObject<T>];
function useResize<T extends HTMLElement = HTMLElement>(element: Element<T>): [Size];

function useResize<T extends HTMLElement = HTMLElement>(
  ...args: [Element<T>] | []
): [Size, MutableRefObject<T | null>?] {

  const buffer: Element<T> = typeof args[0] !== undefined ? args[0] as Element<T> : null;
  const elementRef = useRef<T>(buffer);

  const [state, setState] = useState<Size>(() => {
    const listenDom = elementRef.current;
    return {
      width: (listenDom || {}).clientWidth,
      height: (listenDom || {}).clientHeight
    };
  });

  useLayoutEffect(() => {
    if (!elementRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(elementRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef.current]);

  if (!!buffer) {
    return [state];
  }

  return [state, elementRef];
}

export default useResize;