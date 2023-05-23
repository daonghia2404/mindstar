import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetManagersParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import { EGetManagersAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TUser } from '@/common/models';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';

import './Managers.scss';

const Managers: React.FC = () => {
  const dispatch = useDispatch();

  const getManagersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetManagersAction.GET_MANAGERS]);
  const managersState = useSelector((state: TRootState) => state.managerReducer.getManagersResponse)?.data;

  const [getManagersParamsRequest, setGetManagersParamsRequest] = useState<TGetManagersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleSearch = (keyword?: string): void => {
    setGetManagersParamsRequest({
      ...getManagersParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetManagersParamsRequest({
      ...getManagersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TUser): TDropdownMenuItem[] => [
    {
      value: 'view',
      label: 'Xem',
      icon: EIconName.Eye,
      onClick: (): void => {},
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {},
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {},
    },
  ];

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      sorter: true,
      keySort: 'name',
      width: 180,
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-info">
          {/* <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
          <div className="Table-info-description">{record?.count_player || EEmpty.ZERO} học viên</div> */}
        </div>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'manager',
      dataIndex: 'manager',
      title: 'Quản lý',
      className: 'limit-width',
      render: (_: string, record: TUser): React.ReactElement => <>-</>,
    },
    {
      key: 'primary_contact',
      dataIndex: 'primary_contact',
      title: 'Hotline',
      render: (value: string): React.ReactElement => (
        <a href={`tel: ${value}`} className="Table-link">
          {value}
        </a>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TUser): React.ReactElement => <></>,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TUser): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions(record)}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="Managers">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Managers-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.MINE_SHAFT} />}
                  onSearch={handleSearch}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Managers-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.MapMarker} color={EIconColor.TUNDORA} />
                      Tổng Giáo Viên: <strong>{managersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Giáo Viên"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                    />
                  </Col>
                </Row>
              }
              loading={getManagersLoading}
              columns={columns}
              dataSources={managersState?.content || []}
              page={getManagersParamsRequest?.page}
              pageSize={getManagersParamsRequest?.size}
              total={managersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Managers;
