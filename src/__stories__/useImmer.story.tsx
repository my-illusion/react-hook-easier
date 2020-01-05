import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useImmer } from '..';

const { useState } = React;

import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const [state, draft] = useImmer({
    name: 1,
  });

  console.log(state);
  return (
    <div
      onClick={() => {
        draft(state => {
          state.name = 2;
        });
      }}
    >
      hello
    </div>
  );
};

storiesOf('State|useImmer', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
