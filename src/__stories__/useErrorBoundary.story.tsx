import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useErrorBoundary } from '..';
import ShowDocs from './utils/ShowDocs';

const Count = () => {
  throw new Error('hhh');
  return <div>214324</div>;
};

const Demo = useErrorBoundary()(Count);

storiesOf('State|useErrorBoundary', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
