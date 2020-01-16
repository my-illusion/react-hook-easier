import { useLayoutEffect } from 'react';

export default (baseWidth: number = 350) => {
  useLayoutEffect(() => {
    let docEl = document.documentElement,
      resizeEvt =
        'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / baseWidth) + 'px';
      };
    recalc();
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    return () => {
      window.removeEventListener(resizeEvt, recalc, false);
    };
  }, []);
};
