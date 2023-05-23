import React from 'react';
import { useSelector } from 'react-redux';

import Card from '@/components/Card';
import Table from '@/components/Table';
import { EIconColor, EIconName } from '@/components/Icon';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { TExpense } from '@/common/models';

import { TRecentExpenseTableProps } from './RecentExpenseTable.types';
import './RecentExpenseTable.scss';

const RecentExpenseTable: React.FC<TRecentExpenseTableProps> = () => {
  const expensesState = useSelector((state: TRootState) => state.expenseReducer.getExpensesResponse)?.data;

  const columns = [
    {
      key: 'column1',
      dataIndex: 'column1',
      title: '',
      render: (_: string, record: TExpense): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.category?.name || EEmpty.DASH}</div>
          <div className="Table-info-description">{record?.note || EEmpty.DASH}</div>
        </div>
      ),
    },
    {
      key: 'column2',
      dataIndex: 'column2',
      title: '',
      render: (_: string, record: TExpense): React.ReactElement => (
        <div className="Table-info text-right">
          <div className="Table-info-title" style={{ color: EIconColor.POMEGRANATE }}>
            -{formatCurrency({ amount: record.amount, showSuffix: true })}
          </div>
          <div className="Table-info-description">{formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY'])}</div>
        </div>
      ),
    },
  ];

  return (
    <Card
      className="RecentExpenseTable"
      title="Chi phí gần đây"
      suffixLink={{ icon: EIconName.ArrowLongRight, link: '#' }}
    >
      <div className="RecentExpenseTable-wrapper">
        <Table columns={columns} dataSources={expensesState?.content || []} />
      </div>
    </Card>
  );
};

export default RecentExpenseTable;
