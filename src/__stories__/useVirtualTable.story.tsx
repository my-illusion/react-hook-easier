import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Table } from 'antd';

import ShowDocs from './utils/ShowDocs';

const { useState, useLayoutEffect } = React;

const columns = [
  {
    title: 'title_1',
    dataIndex: 'index1'
  },
  {
    title: 'title_2',
    dataIndex: 'index2'
  }
];

const dataSourceTemp = Array.from({ length: 1000000 }, (_, index) => ({
  index1: `title1_${index}`,
  index2: `title2_${index}`,
  key: index
}));

const Demo = () => {
  const [dataSource, setDataSource] = useState([]);
  const [current, setCurrent] = useState(2);

  useLayoutEffect(() => {
    setDataSource(dataSourceTemp.slice(10 * (current - 1), 10 * (current - 1) + 10));
  }, [current]);

  dataSource.forEach(item => {
    item.name = 2;
  })

  console.log(dataSourceTemp.slice(5, 20))


  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: 1000000,
          current: current,
          onChange: (current, pagesize) => {
            console.log(current, pagesize);
            setCurrent(current);
          }
        }}
      />
    </div>
  )
};

storiesOf('State|useFetch111', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCache.md')} />)
  .add('Demo', () => <Demo />);
