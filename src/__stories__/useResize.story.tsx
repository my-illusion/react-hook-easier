import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useResize } from '..';
import ShowDocs from './utils/ShowDocs';

const { useState } = React;


const Demo = () => {

  const [state, elementRef] = useResize<HTMLDivElement>();
  console.log(state)
  return (
    <div ref={elementRef}>
      123213
    </div>
  )
};

storiesOf('State|useResize', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
