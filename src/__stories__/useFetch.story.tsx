import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  return <div>214324</div>;
};

storiesOf('State|useFetch', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
