import { storiesOf } from '@storybook/react';
import * as React from 'react';

import useRedux from '../useRedux';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const [store, dispatch] = useRedux({
    fields: ['name', 'age'],
    defaultState: {
      name: '小明',
      age: 14,
    },
  });

  console.log(store);
  return (
    <div
      onClick={() => {
        dispatch('name:hhh');
      }}
    >
      123213
    </div>
  );
};

storiesOf('State|useRedux', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
