import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useImageToBase64 } from '..';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const imageLoad = useImageToBase64(
    'http://img4.imgtn.bdimg.com/it/u=1188387633,958216909&fm=26&gp=0.jpg'
  );
  imageLoad.then(result => {
    console.log(result);
  });
  return <div>234324</div>;
};

storiesOf('State|useImageToBase64.story', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
