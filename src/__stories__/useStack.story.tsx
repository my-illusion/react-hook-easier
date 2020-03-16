import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useStack } from '..';
import ShowDocs from './utils/ShowDocs';

const { useState } = React;

const Demo = () => {
  const { createCursor, pop, push } = useStack<any>();
  const [count, setCount] = useState(0);
  return (
    <div>
      {count} --{' '}
      <button
        onClick={() => {
          setCount(count => ++count);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count => --count);
        }}
      >
        -
      </button>
      <button>undo</button>
    </div>
  );
};

storiesOf('State|useStack', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
