 import raf from 'raf'
 import * as React from 'react'

 import { getScroll, isWindow, easeInOutCubic} from './utils'

 const { useCallback, useRef } = React

 interface ScrollToOptions {
    // /** Scroll container, default as window */
    getContainer?: () => HTMLElement | Window | Document;
    /** Scroll end callback */
    callback?: () => any;
    /** Animation duration, default as 450 */
    duration?: number;
  }

function scrollTo(options: ScrollToOptions, y: number){
    const { getContainer = () => window, callback, duration = 450 } = options;
    
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const startTime = Date.now();
    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
        if (isWindow(container)) {
            (container as Window).scrollTo(window.pageXOffset, nextScrollTop);
        } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
            (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
        } else {
            (container as HTMLElement).scrollTop = nextScrollTop;
        }
        if (time < duration) {
            raf(frameFunc);
        } else if (typeof callback === 'function') {
            callback();
        }
    }
    raf(frameFunc);
 }

 export default function useScrollTo(options: ScrollToOptions = {}) {
     const ref = useRef()
     options = {
         ...options,
         getContainer: () => (ref.current ? ref.current : window)
     } as ScrollToOptions
    return [ref, useCallback(scrollTo.bind(this, options), [])]
 }