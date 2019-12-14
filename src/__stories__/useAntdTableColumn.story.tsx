import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Table } from 'antd';

import ShowDocs from './utils/ShowDocs';
import { useAntdTableColumn } from '..';

const columns = [
  {
    title: '标题一',
    dataIndex: 'title_1',
  },
  {
    title: '标题二',
    dataIndex: 'title_2',
  },
  {
    title: '标题三',
    dataIndex: 'title_3',
  },
  {
    title: '标题四',
    dataIndex: 'title_4',
  },
  {
    title: '标题五',
    dataIndex: 'title_5',
  },
];

const Demo = () => {
  const result = useAntdTableColumn();
  console.log(result);
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

storiesOf('Layout|useAntdTableColumn', module)
  .add('Docs', () => (
    <ShowDocs md={require('../../docs/useAntdTableColumn.md')} />
  ))
  .add('Demo', () => <Demo />);
