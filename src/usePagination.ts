import { useState, useMemo } from 'react';

const defaultConfig = {
  current: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['5', '10', '20', '30', '40'],
  showSizeChanger: false,
  showQuickJumper: false,
};

type IPagination = Partial<typeof defaultConfig>;

const usePagination = (config: IPagination) => {
  const mergeConfig = Object.assign({}, defaultConfig, config);
  const [selectedRowkeys, setSelectedRowkeys] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    ...mergeConfig,
    onChange: (current: number) => {
      setPagination(pa => ({
        ...pa,
        current: current,
      }));
    },
    onShowSizeChange: (_, pageSize) => {
      setPagination(pa => ({
        ...pa,
        pageSize: pageSize,
      }));
    },
  });

  const rowSelection = useMemo(() => {
    return {
      onChange: rowkeys => {
        setSelectedRowkeys(rowkeys);
      },
      selectedRowkeys,
    };
  }, [selectedRowkeys]);
  return {
    selectedRowkeys,
    setSelectedRowkeys,
    pagination,
    setPagination,
    rowSelection,
  };
};

export default usePagination;
