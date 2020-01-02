import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { useFetchQueue } from '..';
import ShowDocs from './utils/ShowDocs';

const getPromise = (time, msg, err?) => () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      } else {
        resolve(msg);
      }
    }, time);
  });
};

const fetchQueue = [
  getPromise(100, 'index1'),
  getPromise(200, 'index2', '2-err'),
  getPromise(300, 'index3', '3-err'),
  getPromise(400, 'index4', '4-err'),
  getPromise(500, 'index5'),
  getPromise(600, 'index6', '6-err'),
  getPromise(1700, 'index7'),
];

const Demo = React.memo(() => {
  useFetchQueue(
    fetchQueue,
    3,
    result => {
      console.log(result);
    },
    4
  );
  return <div>123213</div>;
});

storiesOf('State|useFetchQueue', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
