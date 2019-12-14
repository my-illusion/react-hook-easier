# `useAntdTableColumn`

hooks for antd table, for purpose of resolving Table misplacement

## `Useage`

```jsx
const { scrollX, render } = useAntdTableColumn({
  averageNum: 6, // times of using render Function
  hasSelectedRowkeys: true,
  tableWidth: window.innerWidth, // Table Width
});

<Table
  scroll={{
    x: scrollX,
    y: "calc(100% - (it's up to you)px)",
  }}
/>;
```

## addition

```less
if you find some gaps in the rightmost fixed column, maybe you should overwrite the following stylesheet ;

.ant-table-scroll table .ant-table-fixed-columns-in-body {
  visibility: visible;
}
```

## Reference

```js
const { scrollX, render } = useAntdTableColumn({
  averageNum: 6,
  hasSelectedRowkeys: true,
  tableWidth: window.innerWidth - 108 * 2,
});

const columns = useMemo(() => {
  return [
    {
      title: '区域名称',
      dataIndex: 'name',
      ...render(200),
    },
    {
      title: '地址',
      dataIndex: 'address',
      ...render(200),
    },
    {
      title: '设备编号',
      dataIndex: 'deviceId',
      ...render(200),
    },
    {
      title: '状态',
      dataIndex: 'online',
      width: 100,
      render: status => {
        return <div>{status ? '在线' : '离线'}</div>;
      },
    },
    {
      title: '电量',
      dataIndex: 'index5',
      ...render(100),
    },
    {
      title: '管理人',
      dataIndex: 'administrator',
      ...render(200),
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      ...render(200),
    },
    {
      title: '告警',
      dataIndex: 'alarmNum',
      width: 100,
    },
    {
      title: '操作',
      width: 250,
      fixed: 'right',
      render: (text, record) => {
        return (
          <div>
            <a>查看监控</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a>详情</a>
            <Divider type="vertical" />
            <a>删除</a>
          </div>
        );
      },
    },
  ];
}, []);
```
