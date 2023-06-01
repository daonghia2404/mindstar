import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions, dataPointsRangeOptions } from '@/common/constants';
import { EAuditingStatus, EEmpty, EFormat } from '@/common/enums';
import { TReward } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetRewardsAction, getRewardsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetRewardsParams } from '@/services/api';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import ModalDeleteReward from '@/pages/Rewards/ModalDeleteReward';
import ModalRewardForm from '@/pages/Rewards/ModalRewardForm';
import Avatar from '@/components/Avatar';
import Status from '@/components/Status';
import Select from '@/components/Select';

import './Rewards.scss';

const Rewards: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getRewardsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetRewardsAction.GET_REWARDS]);
  const classsState = useSelector((state: TRootState) => state.rewardReducer.getRewardsResponse)?.data;
  const [modalRewardFormState, setModalRewardFormState] = useState<{ visible: boolean; data?: TReward }>({
    visible: false,
  });
  const [modalDeleteRewardState, setModalDeleteRewardState] = useState<{ visible: boolean; data?: TReward }>({
    visible: false,
  });

  const [getRewardsParamsRequest, setGetRewardsParamsRequest] = useState<TGetRewardsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const handleOpenModalRewardForm = (data?: TReward): void => {
    setModalRewardFormState({ visible: true, data });
  };

  const handleCloseModalRewardForm = (): void => {
    setModalRewardFormState({ visible: false });
  };

  const handleOpenModalDeleteReward = (data?: TReward): void => {
    setModalDeleteRewardState({ visible: true, data });
  };

  const handleCloseModalDeleteReward = (): void => {
    setModalDeleteRewardState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetRewardsParamsRequest({
      ...getRewardsParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetRewardsParamsRequest({
      ...getRewardsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TReward): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalRewardForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteReward(data);
      },
    },
  ];

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (value: string): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(value)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TReward): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.code || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2">{record?.description || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'point_value',
      dataIndex: 'point_value',
      title: 'Điểm',
      sorter: true,
      keySort: 'point_value',
      render: (value: string): string => `${value || EEmpty.ZERO}`,
    },
    {
      key: 'quantity_sold',
      dataIndex: 'quantity_sold',
      title: 'Đã Đổi',
      render: (value: string): string => `${value || EEmpty.ZERO}`,
    },
    {
      key: 'expireDate',
      dataIndex: 'expireDate',
      sorter: true,
      keySort: 'expired_date_time',
      title: 'Ngày hết hạn',
      render: (_: string, record: TReward): React.ReactElement => {
        const isExpired = moment().valueOf() > record.expired_date_time;
        return record.expired_date_time ? (
          <span className="nowrap" style={{ color: isExpired ? EIconColor.POMEGRANATE : EIconColor.APPLE }}>
            {formatISODateToDateTime(record.expired_date_time, EFormat['DD/MM/YYYY'])}
            <br />({isExpired ? `Quá hạn ${record.remaining_days * -1} ngày` : `Còn lại ${record.remaining_days} ngày`})
          </span>
        ) : (
          <>{EEmpty.DASH}</>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TReward): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TReward): React.ReactElement => (
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

  const getRewards = useCallback(() => {
    dispatch(getRewardsAction.request({ params: getRewardsParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getRewardsParamsRequest, currentBranchId]);

  useEffect(() => {
    getRewards();
  }, [getRewards]);

  return (
    <div className="Rewards">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Rewards-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                  onSearch={handleSearch}
                />
              </Col>
              <Col>
                <Select
                  label="Điểm"
                  placeholder="Chọn dữ liệu"
                  value={dataPointsRangeOptions.find(
                    (item) =>
                      item.data.fromPoint === getRewardsParamsRequest?.fromPoint &&
                      item.data.toPoint === getRewardsParamsRequest.toPoint,
                  )}
                  options={dataPointsRangeOptions}
                  allowClear
                  onChange={(option): void => {
                    setGetRewardsParamsRequest({
                      ...getRewardsParamsRequest,
                      page: DEFAULT_PAGE,
                      fromPoint: option?.data?.fromPoint,
                      toPoint: option?.data?.toPoint,
                    });
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Rewards-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Award} color={EIconColor.TUNDORA} />
                      Tổng Phần Thưởng: <strong>{classsState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Phần Thưởng"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalRewardForm}
                    />
                  </Col>
                </Row>
              }
              loading={getRewardsLoading}
              columns={columns}
              dataSources={classsState?.content || []}
              page={getRewardsParamsRequest?.page}
              pageSize={getRewardsParamsRequest?.size}
              total={classsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalRewardForm {...modalRewardFormState} onClose={handleCloseModalRewardForm} onSuccess={getRewards} />
      <ModalDeleteReward {...modalDeleteRewardState} onClose={handleCloseModalDeleteReward} onSuccess={getRewards} />
    </div>
  );
};

export default Rewards;
