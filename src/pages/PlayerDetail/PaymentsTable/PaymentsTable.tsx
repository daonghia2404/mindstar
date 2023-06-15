import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import { TPaymentsTableProps } from './PaymentsTable.types';
import Table from '@/components/Table';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  dataPaymentTypeOptions,
  dataTransactionTypeOptions,
} from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import { TTransaction } from '@/common/models';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import { EGetTransactionsAction, getTransactionsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetTransactionsParams } from '@/services/api';
import Icon, { EIconColor, EIconName } from '@/components/Icon';

import './PaymentsTable.scss';

const PaymentsTable: React.FC<TPaymentsTableProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getTransactionsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetTransactionsAction.GET_TRANSACTIONS],
  );
  const transactionsState = useSelector((state: TRootState) => state.transactionReducer.getTransactionsResponse)?.data;

  const [getTransactionsParamsRequest, setGetTransactionsParamsRequest] = useState<TGetTransactionsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    playerIds: `${id}`,
  });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetTransactionsParamsRequest({
      ...getTransactionsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const columns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '',
      render: (_: string, __: TTransaction, index: number): string => `${index + 1}`,
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Tổng giá trị',
      className: 'nowrap',
      sorter: true,
      keySort: 'amount',
      render: (_: string, record: TTransaction): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title" style={{ color: EIconColor.APPLE }}>
              + {formatCurrency({ amount: record.amount || EEmpty.ZERO, showSuffix: true })}
            </div>
            <div className="Table-info-description">
              {dataPaymentTypeOptions.find((item) => item.value === record?.payment_type)?.label || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'atDate',
      dataIndex: 'atDate',
      title: 'Ngày tạo',
      sorter: true,
      keySort: 'at_date',
      className: 'nowrap',
      render: (_: string, record: TTransaction): string =>
        record.at_date ? formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: 'Loại',
      className: 'nowrap',
      sorter: true,
      keySort: 'transaction_detail_type',
      render: (_: string, record: TTransaction): string => {
        const currentRevenue = dataTransactionTypeOptions.find((item) => item.value === record.transaction_detail_type);
        return currentRevenue ? currentRevenue.label : EEmpty.DASH;
      },
    },
    {
      key: 'short_description',
      dataIndex: 'short_description',
      title: 'Ghi chú',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
  ];

  const getTransactions = useCallback(() => {
    dispatch(
      getTransactionsAction.request({
        useAdmin: false,
        params: getTransactionsParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getTransactionsParamsRequest, currentBranchId]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="PaymentsTable">
      <Table
        header={
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <div className="Table-total-item">
                    <Icon name={EIconName.Receipt} color={EIconColor.TUNDORA} />
                    Tổng Hoá Đơn: <strong>{transactionsState?.total_elements || EEmpty.ZERO}</strong>
                  </div>
                </Col>
                <Col>
                  <div className="Table-total-item">
                    <Icon name={EIconName.PigMoney} color={EIconColor.TUNDORA} />
                    Tổng Doanh Thu:{' '}
                    <strong>
                      {formatCurrency({ amount: transactionsState?.sub_total || EEmpty.ZERO, showSuffix: true })}
                    </strong>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        useCardResponsive={false}
        columns={columns}
        dataSources={transactionsState?.content || []}
        page={getTransactionsParamsRequest?.page}
        pageSize={getTransactionsParamsRequest?.size}
        total={transactionsState?.total_elements}
        loading={getTransactionsLoading}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default PaymentsTable;
