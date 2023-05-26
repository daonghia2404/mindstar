import React, { useState } from 'react';
import classNames from 'classnames';
import { Table as AntdTable } from 'antd';

import Select from '@/components/Select';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTablePerPageOptions } from '@/common/constants';
import Pagination from '@/components/Pagination';
import Empty from '@/components/Empty';

import { TTableProps } from './Table.types';
import './Table.scss';

const Table: React.FC<TTableProps> = ({
  className,
  columns,
  dataSources,
  header,
  loading,
  rowKey = 'id',
  title,
  page,
  pageSize,
  total,
  showPagination = true,
  scroll,
  onRow,
  onPaginationChange,
}) => {
  const [sorting, setSorting] = useState<string>();

  const handleTableChange = (_: any, __: any, sorter: any): void => {
    if (sorter) {
      const key = sorter.column?.keySort;
      if (key) {
        const typeOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
        const sortValue = `${key}:${typeOrder}`;
        onPaginationChange?.(DEFAULT_PAGE, pageSize || DEFAULT_PAGE_SIZE, sortValue);
        setSorting(sortValue);
      } else {
        onPaginationChange?.(DEFAULT_PAGE, pageSize || DEFAULT_PAGE_SIZE, undefined);
        setSorting(undefined);
      }
    }
  };

  return (
    <div className={classNames('Table', className)}>
      {header && <div className="Table-header">{header}</div>}
      <div className="Table-body">
        <AntdTable
          locale={{
            cancelSort: 'Hủy sắp xếp',
            triggerDesc: 'Sắp xếp giảm dần',
            triggerAsc: 'Sắp xếp tăng dần',
            emptyText: <Empty />,
          }}
          rowClassName={classNames({ 'cursor-pointer': onRow })}
          pagination={false}
          columns={columns}
          dataSource={dataSources}
          loading={loading}
          rowKey={rowKey}
          onRow={onRow}
          title={title}
          onChange={handleTableChange}
          scroll={{ ...scroll, x: 'auto' }}
        />
      </div>
      {!!showPagination && !!pageSize && !!total && (
        <div className="Table-footer flex items-center justify-between">
          <div className="Table-footer-perpage flex items-center">
            <Select
              label="Hiển thị / trang"
              options={dataTablePerPageOptions}
              placement="topLeft"
              size="small"
              value={dataTablePerPageOptions.find((option) => Number(option.value) === pageSize)}
              onChange={(data): void => {
                onPaginationChange?.(DEFAULT_PAGE, Number(data?.value), sorting);
              }}
            />
          </div>
          <div className="Table-footer-pagination">
            <Pagination
              page={(page || DEFAULT_PAGE) + 1}
              pageSize={pageSize}
              total={total}
              onChange={(changedPage, changedPageSize): void =>
                onPaginationChange?.(changedPage - 1, changedPageSize || pageSize, sorting)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
