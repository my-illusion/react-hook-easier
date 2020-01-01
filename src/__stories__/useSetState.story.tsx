import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button } from 'antd';

import { useSetState } from '..';
import ShowDocs from './utils/ShowDocs';

const { useState } = React;

const Demo = () => {

  const [count, setCount] = useSetState<number>(1);
  //const [count, setCount] = useState<number>(1);
  const [name, setName] = useState('hello');

  React.useEffect(() => {
    setTimeout(() => {
      console.log(count.current);
    }, 1000);
  }, [name]);

  return (
    <div>
      <Button onClick={() => {
        setName("world");
        // setTimeout(() => {
        //   setCount(count => {
        //     return count + 1;
        //   });
        // }, 500);
        setCount(count => {
          return count + 1;
        });
      }}>先更新name再更新count</Button>{count.current} --- {name}<br />
    </div>
  )
};

storiesOf('State|useResize', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
