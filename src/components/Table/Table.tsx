import React, { useState } from 'react';
import classNames from 'classnames';
import { Table as AntdTable, Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Select from '@/components/Select';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTablePerPageOptions } from '@/common/constants';
import Pagination from '@/components/Pagination';
import Empty from '@/components/Empty';
import Card from '@/components/Card';
import Loading from '@/components/Loading';

import { TTableProps } from './Table.types';
import './Table.scss';
import { getTotalPage } from '@/utils/functions';

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
  useCardResponsive = true,
  rowClassName,
  onRow,
  onPaginationChange,
}) => {
  const [sorting, setSorting] = useState<string>();
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const isEmpty = dataSources.length === 0;
  const totalPage = getTotalPage(total || 0, pageSize || 0);

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
      {isMobile && useCardResponsive ? (
        <div className="Table-card-wrapper">
          {loading && (
            <div className="Table-card-loading flex">
              <Loading />
            </div>
          )}
          {isEmpty ? (
            <Empty />
          ) : (
            <Row gutter={[16, 16]}>
              {dataSources.map((data, dataIndex) => (
                <Col span={24} sm={{ span: 12 }}>
                  <Card className="Table-card">
                    <Row gutter={[16, 16]}>
                      {columns.map((column) => {
                        return (
                          <Col span={24}>
                            <div className={classNames('Table-card-column', column.key)} key={column.key}>
                              <div className="Table-card-title">{column.title}</div>

                              {typeof column.render === 'function'
                                ? column.render(data[column.key], data, dataIndex)
                                : data[column.key]}
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      ) : (
        <div className="Table-body">
          <AntdTable
            locale={{
              cancelSort: 'Hủy sắp xếp',
              triggerDesc: 'Sắp xếp giảm dần',
              triggerAsc: 'Sắp xếp tăng dần',
              emptyText: <Empty />,
            }}
            rowClassName={(record, index): string =>
              classNames({ 'cursor-pointer': onRow }, rowClassName?.(record, index))
            }
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
      )}

      {totalPage > 1 && !!showPagination && !!pageSize && !!total && (
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
