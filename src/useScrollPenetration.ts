/**
 * description: to resolve scroll penetration
 * author: songbb
 * Last-Modified: 2019-12-27
 */
import { useLayoutEffect } from 'react';

let scrollTop: number = document.body.scrollTop;

export default (toggle: boolean): void => {
  useLayoutEffect(() => {
    if (toggle) {
      scrollTop = document.body.scrollTop;
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = -scrollTop + 'px';
    } else {
      document.body.style.overflowY = '';
      document.body.style.position = '';
      if (scrollTop !== 0) {
        document.body.scrollTo(0, scrollTop)
      }
    }
  }, [toggle]);
};