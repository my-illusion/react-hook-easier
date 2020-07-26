import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useScrollTo } from '..';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
    const [ref, scrollTo] = useScrollTo()
  return <div style={{ height: 200, overflow: 'auto' }} ref={ref} onClick={() => {
      console.log('jjj')
      scrollTo(300)
  }}>
      <div style={{ height: 800 }}>hhhh</div>
  </div>;
};

storiesOf('State|useScrollTo', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
