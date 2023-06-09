import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataLevelOptions } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import { EEmpty, EFormat, EUserType } from '@/common/enums';
import { EGetUsersAction, getUsersAction } from '@/redux/actions';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { TGetUsersParams } from '@/services/api';
import Avatar from '@/components/Avatar';
import { TUser } from '@/common/models';
import { Paths } from '@/pages/routers';
import Tags from '@/components/Tags';

import './Customers.scss';

const Customers: React.FC = () => {
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const usersState = useSelector((state: TRootState) => state.userReducer.getUsersResponse)?.data;
  const getCustomersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetUsersAction.GET_USERS]);

  const [getUsersParamsRequest, setGetUsersParamsRequest] = useState<TGetUsersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    userType: EUserType.PLAYER,
  });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetUsersParamsRequest({
      ...getUsersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetUsersParamsRequest({
      ...getUsersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

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
      title: 'Phụ huynh',
      className: 'limit-width',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          {record.mobile ? (
            <a href={`tel: ${record.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
              {record.mobile}
            </a>
          ) : (
            <div className="Table-info-description">{EEmpty.DASH}</div>
          )}
        </div>
      ),
    },
    {
      key: 'players',
      dataIndex: 'players',
      title: 'Học viên',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.players && record?.players?.length > 0 ? (
          <Tags
            options={record?.players?.map((item) => ({
              label: item.name,
              value: String(item.id),
              data: { avatar: getFullUrlStatics(item.avatar) },
              onClick: (): void => {
                navigate(Paths.PlayerDetail(String(item.id)));
              },
            }))}
          />
        ) : (
          <>{EEmpty.DASH}</>
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
      key: 'earnPoints',
      dataIndex: 'earnPoints',
      title: 'Điểm',
      className: 'nowrap',
      sorter: true,
      keySort: 'points',
      render: (_: string, record: TUser): React.ReactElement => {
        const level = dataLevelOptions.find((item) => item.value === record.level_id);
        return (
          <div className="Table-info">
            <div className="Table-info-title">
              <Tags
                noStyle
                options={[
                  {
                    label: String(record?.points || EEmpty.ZERO),
                    value: 'point',
                    data: {
                      iconName: EIconName.JewishStarFill,
                      iconColor: EIconColor.AMBER,
                    },
                  },
                ]}
              />
            </div>
            <div className="Table-info-description" style={{ color: level?.data.color }}>
              {record?.level_name}
            </div>
          </div>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: 'Tổng chi tiêu',
      sorter: true,
      keySort: 'total_spending',
      render: (_: string, record: TUser): React.ReactElement => (
        <span>{formatCurrency({ amount: record.total_spending || EEmpty.ZERO, showSuffix: true })}</span>
      ),
    },
    {
      key: 'device',
      dataIndex: 'device',
      title: 'Thiết bị',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.device_list && record?.device_list?.length > 0 ? (
          <Tags
            options={record?.device_list?.map((item, index) => ({
              label: item,
              value: String(index),
              data: { iconName: EIconName.Devices },
            }))}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'createDate',
      dataIndex: 'createDate',
      title: 'Ngày Tạo',
      className: 'nowrap',
      render: (_: string, record: TUser): string =>
        record?.create_date ? formatISODateToDateTime(record.create_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
  ];

  const getUsers = useCallback(() => {
    dispatch(
      getUsersAction.request({
        params: getUsersParamsRequest,
        paths: { suffix: 'search' },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getUsersParamsRequest, currentBranchId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="Customers">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Customers-filter">
            <Row gutter={[16, 16]}>
              <Col span={22}>
                <Row gutter={[24, 24]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Customers-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Users} color={EIconColor.TUNDORA} />
                      Tổng số khách hàng:
                      <strong>{usersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getCustomersLoading}
              columns={columns}
              dataSources={usersState?.content || []}
              page={getUsersParamsRequest.page}
              pageSize={getUsersParamsRequest.size}
              total={usersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Customers;
