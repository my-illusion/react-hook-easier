import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useCurryFn } from '..';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const count = useCurryFn((name, age, school, other) => {
    console.log(name, age, school, other);
  });
  count('xiaoming')('14')('hhhh', 'gggg');
  return <div>214324</div>;
};

storiesOf('State|useCurryFn', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
