import React from 'react';

export type TTableProps = {
  className?: string;
  columns: TTableColumn[];
  dataSources: Array<any>;
  rowKey?: string;
  showTable?: boolean;
  loading?: boolean;
  header?: React.ReactNode;
  page?: number;
  useCardResponsive?: boolean;
  pageSize?: number;
  total?: number;
  showPagination?: boolean;
  rowClassName?: (record: any, index: number) => string | undefined;
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  onRow?: (data: any) => {
    onClick?: () => void;
  };
  title?: () => React.ReactElement;
  onPaginationChange?: (page: number, pageSize: number, sorter?: string) => void;
  onSearch?: (keyword: string) => void;
};

export type TTableColumn = {
  title: string;
  key: string | number;
  dataIndex: string;
  className?: string;
  fixed?: any;
  ellipsis?: boolean;
  width?: string | number;
  sorter?: ((a: any, b: any) => number) | boolean;
  render?: (text: string, record: any, index: number) => React.ReactElement | string;
};
