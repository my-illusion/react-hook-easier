import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  return <div>hello</div>;
};

storiesOf('State|useImmer', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
