import React from 'react';
import { useSelector } from 'react-redux';

import Card from '@/components/Card';
import Table from '@/components/Table';
import { EIconName } from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { TRootState } from '@/redux/reducers';
import { TOrder } from '@/common/models';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { EEmpty, EFormat } from '@/common/enums';
import { dataOrderStatusOptions, dataPaymentTypeOptions } from '@/common/constants';

import { TRecentOrdersTableProps } from './RecentOrdersTable.types';
import './RecentOrdersTable.scss';

const RecentOrdersTable: React.FC<TRecentOrdersTableProps> = () => {
  const ordersState = useSelector((state: TRootState) => state.orderReducer.getOrdersResponse)?.data;

  const columns = [
    {
      key: 'column1',
      dataIndex: 'column1',
      title: '',
      width: 72,
      render: (_: string, record: TOrder): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} shape="square" defaultImage image={getFullUrlStatics(record.product_image_path)} />
        </div>
      ),
    },
    {
      key: 'column2',
      dataIndex: 'column2',
      title: '',
      render: (_: string, record: TOrder): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.product_name || EEmpty.DASH}</div>
          <div className="Table-info-description">
            {record?.customer_info?.name || EEmpty.DASH} - {record?.customer_info?.mobile || EEmpty.DASH}
          </div>
          <div className="Table-info-description">
            {formatISODateToDateTime(record.create_date, EFormat['DD/MM/YYYY - HH:mm'])}
          </div>
        </div>
      ),
    },
    {
      key: 'column3',
      dataIndex: 'column3',
      title: '',
      render: (_: string, record: TOrder): React.ReactElement => {
        const orderStatus = dataOrderStatusOptions.find((item) => item.value === record.order_status);

        return (
          <div className="Table-info text-right">
            <div className="Table-info-title nowrap">
              {formatCurrency({ amount: record.amount - record.discount_value, showSuffix: true })}
            </div>
            <div className="Table-info-description nowrap">
              {dataPaymentTypeOptions.find((item) => item.value === record.payment_type)?.label || EEmpty.DASH}
            </div>
            <div className="Table-info-description nowrap" style={{ color: orderStatus?.data?.color }}>
              {orderStatus?.label}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Card
      className="RecentOrdersTable"
      title="Đơn hàng gần đây"
      suffixLink={{ icon: EIconName.ArrowLongRight, link: '#' }}
    >
      <div className="RecentOrdersTable-wrapper">
        <Table columns={columns} dataSources={ordersState?.content || []} />
      </div>
    </Card>
  );
};

export default RecentOrdersTable;
