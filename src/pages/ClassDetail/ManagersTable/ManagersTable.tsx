import React from 'react';
import { navigate } from '@reach/router';

import { TManagersTableProps } from './ManagersTable.types';
import Table from '@/components/Table';
import { dataDegreeTypeOptions } from '@/common/constants';
import { EEmpty, EFormat } from '@/common/enums';
import { TUser } from '@/common/models';
import { Paths } from '@/pages/routers';
import { getFullUrlStatics, formatISODateToDateTime } from '@/utils/functions';
import Avatar from '@/components/Avatar';

const ManagersTable: React.FC<TManagersTableProps> = ({ dataSources = [] }) => {
  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      width: 180,
      render: (_: string, record: TUser): React.ReactElement => {
        const dergeeType = dataDegreeTypeOptions.find((item) => item.value === record.degree_type);
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: dergeeType?.data?.color }}>
              {dergeeType?.label}
            </div>
          </div>
        );
      },
    },
    {
      key: 'date_of_birth',
      dataIndex: 'date_of_birth',
      title: 'Ngày Sinh',
      render: (_: string, record: TUser): string =>
        record?.date_of_birth ? formatISODateToDateTime(record.date_of_birth, EFormat['DD/MM/YYYY']) : EEmpty.DASH,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Số điện thoại',
      render: (value: string): React.ReactElement =>
        value ? (
          <a href={`tel: ${value}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
            {value}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
  ];

  return (
    <div className="ManagersTable">
      <Table
        columns={columns}
        dataSources={dataSources}
        scroll={{ y: 73 * 4 }}
        onRow={(record: TUser): any => ({
          onClick: (): void => {
            navigate(Paths.ManagerDetail(String(record.id)));
          },
        })}
      />
    </div>
  );
};

export default ManagersTable;
