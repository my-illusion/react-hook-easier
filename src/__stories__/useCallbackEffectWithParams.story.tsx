import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useCallbackEffectWithParams } from '..';
import ShowDocs from './utils/ShowDocs';

const { useState } = React;

const Demo = () => {
  const [count, setCount] = useState(0);
  const getData = values => (...args) => {
    console.log(values, args);
  };

  const setCallback = useCallbackEffectWithParams(getData, [count], undefined);
  return (
    <div
      onClick={() => {
        setCallback({ name: 'hhh' });
        setCount(1);
      }}
    >
      123213
    </div>
  );
};

storiesOf('State|useCallbackEffectWithParams', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
