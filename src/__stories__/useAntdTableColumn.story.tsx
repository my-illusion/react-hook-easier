import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Table } from 'antd';

import ShowDocs from './utils/ShowDocs';
import { useAntdTableColumn } from '..';

const dataSource = [
  {
    key: 1,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
  {
    key: 2,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
  {
    key: 3,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
  {
    key: 4,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
  {
    key: 5,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
  {
    key: 6,
    title_1: 'test data....',
    title_2: 'test data....',
    title_3: 'test data....',
    title_4: 'test data....',
    title_5: 'test data....',
  },
];

const Demo = () => {
  const { scrollX, render } = useAntdTableColumn({
    averageNum: 5,
  });

  const columns = [
    {
      title: '标题一',
      dataIndex: 'title_1',
      ...render(200),
    },
    {
      title: '标题二',
      dataIndex: 'title_2',
      ...render(200),
    },
    {
      title: '标题三',
      dataIndex: 'title_3',
      ...render(300),
    },
    {
      title: '标题四',
      dataIndex: 'title_4',
      ...render(300),
    },
    {
      title: '标题五',
      dataIndex: 'title_5',
      fixed: 'right',
      ...render(300),
    },
  ];
  console.log(scrollX);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: scrollX,
          y: 100,
        }}
      />
    </div>
  );
};

storiesOf('Layout|useAntdTableColumn', module)
  .add('Docs', () => (
    <ShowDocs md={require('../../docs/useAntdTableColumn.md')} />
  ))
  .add('Demo', () => <Demo />);
