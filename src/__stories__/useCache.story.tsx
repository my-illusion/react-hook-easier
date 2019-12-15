import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useCache } from '..';
import ShowDocs from './utils/ShowDocs';

const cache = useCache<number, string>({});

const Demo = () => {
  console.log(cache(3, 'h1'));
  console.log(cache(2, 'h2'));
  console.log(cache(1, undefined));
  return <div>214324</div>;
};

storiesOf('State|useCache', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
