import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInjectContext, InjectProvider } from '..';

import ShowDocs from './utils/ShowDocs';

const Child = useInjectContext((props) => {
  console.log(props);
  return 'child';
}) as any;

const Demo = () => {
  console.log(useInjectContext, InjectProvider);
  return <InjectProvider value={{ name: 'hhhh' }}><Child age={14} grade={16} /></InjectProvider>;
};

storiesOf('State|useFetch', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
