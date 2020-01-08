import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useEventEmitter } from '..';
import ShowDocs from './utils/ShowDocs';

const event = useEventEmitter();

const Demo = () => {
  event.once('hhh', () => {
    console.log('触发了!!');
  });

  return (
    <div
      onClick={() => {
        event.emit('hhh');
      }}
    >
      useEventEmitter
    </div>
  );
};

storiesOf('State|useEventEmitter', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
