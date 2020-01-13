import { storiesOf } from '@storybook/react';
import * as React from 'react';

const { useState } = React;

import { useWebWorker } from '..';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const [count, setCount] = useState(0);
  const worker: any = useWebWorker(function() {
    self.onmessage = function(e) {
      //console.log(e.data);
      let str = '112313123';
      let start = +new Date();
      for (let i = 0; i < 10; i++) {
        // do bothing;
        str.replace(/231/, 'hhh');
      }
      console.log(+new Date() - start);
      (self as any).postMessage('处理完毕');
    };
  });

  worker.postMessage('hhhh');
  worker.onmessage = function(e) {
    console.log(e.data);
  };
  return (
    <div
      onClick={() => {
        setCount(1);
      }}
    >
      214324 -- {count}
    </div>
  );
};

storiesOf('State|useWebWorker', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
