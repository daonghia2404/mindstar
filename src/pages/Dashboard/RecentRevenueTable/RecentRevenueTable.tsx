import React from 'react';
import { useSelector } from 'react-redux';

import Card from '@/components/Card';
import Table from '@/components/Table';
import { EIconColor, EIconName } from '@/components/Icon';
import { TRootState } from '@/redux/reducers';
import { TTransaction } from '@/common/models';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import { Paths } from '@/pages/routers';
import { dataTransactionTypeOptions } from '@/common/constants';

import { TRecentRevenueTableProps } from './RecentRevenueTable.types';
import './RecentRevenueTable.scss';

const RecentRevenueTable: React.FC<TRecentRevenueTableProps> = () => {
  const transactionsState = useSelector((state: TRootState) => state.transactionReducer.getTransactionsResponse)?.data;

  const columns = [
    {
      key: 'column1',
      dataIndex: 'column1',
      title: '',
      render: (_: string, record: TTransaction): React.ReactElement => {
        const currentRevenue = dataTransactionTypeOptions.find((item) => item.value === record.transaction_detail_type);
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.buyer?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">{currentRevenue ? currentRevenue.label : EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'column2',
      dataIndex: 'column2',
      title: '',
      render: (_: string, record: TTransaction): React.ReactElement => (
        <div className="Table-info text-right">
          <div className="Table-info-title" style={{ color: EIconColor.APPLE }}>
            +{formatCurrency({ amount: record.amount, showSuffix: true })}
          </div>
          <div className="Table-info-description">
            {formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY - HH:mm'])}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card
      className="RecentRevenueTable"
      title="Doanh thu gần đây"
      suffixLink={{ icon: EIconName.ArrowLongRight, link: Paths.Revenues }}
    >
      <div className="RecentRevenueTable-wrapper">
        <Table useCardResponsive={false} columns={columns} dataSources={transactionsState?.content || []} />
      </div>
    </Card>
  );
};

export default RecentRevenueTable;
