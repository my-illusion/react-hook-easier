//import React from 'react';

export interface defaultConfig {
  averageNum?: number;
  hasSelectedRowkeys?: boolean;
  tableWidth?: number;
  bordered?: boolean;
  scrollbarWith?: number;
  padding?: number;
  anchorWidth?: number;
}

export interface TableUtils {
  scrollX: number;
  render: Function;
}

const DEFAULT_CONFIG = {
  averageNum: 1,
  hasSelectedRowkeys: false,
  tableWidth: window.innerWidth,
  bordered: false,
  scrollbarWith: 16,
  anchorWidth: 1300,
};

export default (config: defaultConfig = DEFAULT_CONFIG): TableUtils => {
  const {
    hasSelectedRowkeys,
    tableWidth,
    scrollbarWith,
    anchorWidth,
    averageNum,
  } = Object.assign({}, DEFAULT_CONFIG, config);
  const rowKeysWidth: number = hasSelectedRowkeys ? 60 : 0;
  const scrollX: number = tableWidth - rowKeysWidth - scrollbarWith;
  const diff = Math.floor((scrollX - anchorWidth) / averageNum);
  return {
    scrollX: scrollX,
    render: width => ({
      width: width + diff,
    }),
  };
};
