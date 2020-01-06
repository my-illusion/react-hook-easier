import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useImmutableHelper } from '..';
import ShowDocs from './utils/ShowDocs';

const Demo = () => {
  const [state, setState] = useImmutableHelper({
    name: {
      age: 13,
    },
  });

  console.log(state);
  return (
    <div
      onClick={() => {
        setState({
          name: {
            age: {
              $set: 6,
            },
          },
        });
      }}
    >
      123213
    </div>
  );
};

storiesOf('State|useImmutableHelper', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
