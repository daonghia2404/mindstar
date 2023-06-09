import React from 'react';
import { useSelector } from 'react-redux';

import Card from '@/components/Card';
import Table from '@/components/Table';
import { EIconName } from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { TRootState } from '@/redux/reducers';
import { EEmpty, EFormat } from '@/common/enums';
import { TRedeem } from '@/common/models';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { dataOrderStatusOptions } from '@/common/constants';

import { TRecentRedeemsTableProps } from './RecentRedeemsTable.types';
import './RecentRedeemsTable.scss';

const RecentRedeemsTable: React.FC<TRecentRedeemsTableProps> = () => {
  const redeemsState = useSelector((state: TRootState) => state.redeemReducer.getRedeemsResponse)?.data;

  const columns = [
    {
      key: 'column1',
      dataIndex: 'column1',
      title: '',
      width: 72,
      render: (_: string, record: TRedeem): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} shape="square" defaultImage image={getFullUrlStatics(record.product_image_path)} />
        </div>
      ),
    },
    {
      key: 'column2',
      dataIndex: 'column2',
      title: '',
      render: (_: string, record: TRedeem): React.ReactElement => (
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
      render: (_: string, record: TRedeem): React.ReactElement => {
        const orderStatus = dataOrderStatusOptions.find((item) => item.value === record.redeem_status);
        return (
          <div className="Table-info text-right">
            <div className="Table-info-title nowrap">{record?.point_used || EEmpty.ZERO}</div>
            <div className="Table-info-description">Điểm</div>
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
      className="RecentRedeemsTable"
      title="Đổi thưởng gần đây"
      suffixLink={{ icon: EIconName.ArrowLongRight, link: '#' }}
    >
      <div className="RecentRedeemsTable-wrapper">
        <Table useCardResponsive={false} columns={columns} dataSources={redeemsState?.content || []} />
      </div>
    </Card>
  );
};

export default RecentRedeemsTable;
