import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button } from 'antd';

import { useUpdateEffect } from '..';
import ShowDocs from './utils/ShowDocs';

const { useState } = React;


const Demo = () => {
  const [count, setCount] = useState(1);
  useUpdateEffect(() => {
    console.log("执行了", count);
  }, [count])
  return <div>{count}<Button onClick={() => { setCount(count => ++count) }}>更新count</Button></div>;
};

storiesOf('State|useUpdateEffect', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
