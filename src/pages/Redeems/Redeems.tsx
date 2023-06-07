import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataOrderStatusOptions } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty, EFormat } from '@/common/enums';
import { EGetRedeemsAction, getRedeemsAction } from '@/redux/actions';
import { TRedeem } from '@/common/models';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { TGetRedeemsParams } from '@/services/api';
import Avatar from '@/components/Avatar';
import Status from '@/components/Status';
import ModalRedeemsForm from './ModalRedeemsForm';
import ModalDeleteRedeem from './ModalRedeemsDelete';

import './Redeems.scss';

const Redeems: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getRedeemsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetRedeemsAction.GET_REDEEMS]);
  const redeemsState = useSelector((state: TRootState) => state.redeemReducer.getRedeemsResponse)?.data;

  const [getRedeemsParamsRequest, setGetRedeemsParamsRequest] = useState<TGetRedeemsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const [modalRedeemFormState, setModalRedeemFormState] = useState<{ visible: boolean; data?: TRedeem }>({
    visible: false,
  });
  const [modalDeleteRedeemState, setModalDeleteRedeemState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
  });

  const handleOpenModalRedeemForm = (data?: TRedeem): void => {
    setModalRedeemFormState({ visible: true, data });
  };
  const handleCloseModalRedeemForm = (): void => {
    setModalRedeemFormState({ visible: false });
  };
  const handleOpenModalDeleteRedeem = (data?: TRedeem): void => {
    setModalDeleteRedeemState({ visible: true, data });
  };
  const handleCloseModalDeleteRedeem = (): void => {
    setModalDeleteRedeemState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetRedeemsParamsRequest({
      ...getRedeemsParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetRedeemsParamsRequest({
      ...getRedeemsParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };
  const dataTableDropdownActions = (data?: TRedeem): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalRedeemForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteRedeem(data);
      },
    },
  ];
  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TRedeem): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.player_profile?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'player_name',
      className: 'limit-width',
      render: (_: string, record: TRedeem): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.player_profile?.name || EEmpty.DASH}</div>
            {record?.player_profile?.mobile ? (
              <a
                href={`tel: ${record?.player_profile?.mobile}`}
                className="Table-link"
                onClick={(e): void => e.stopPropagation()}
              >
                {record?.player_profile?.mobile}
              </a>
            ) : (
              <div className="Table-info-description">{EEmpty.DASH}</div>
            )}
            <div className="Table-info-description">{record?.player_profile?.address || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'reward',
      dataIndex: 'reward',
      title: 'Phần thưởng',
      render: (_: string, record: TRedeem): React.ReactElement => (
        <Row gutter={[16, 16]} align="middle" wrap={false}>
          <Col>
            <Avatar shape="square" size={72} image={getFullUrlStatics(record?.product_image_path)} defaultImage />
          </Col>
          <Col>
            <div className="Table-info">
              <div className="Table-info-title">{record?.product_name || EEmpty.DASH}</div>
            </div>
          </Col>
        </Row>
      ),
    },
    {
      key: 'points',
      dataIndex: 'points',
      title: 'Điểm',
      render: (_: string, record: TRedeem): string => String(record?.point_used) || EEmpty.DASH,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TRedeem): React.ReactElement => {
        const status = dataOrderStatusOptions.find((item) => item.value === record.redeem_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'issueDate',
      dataIndex: 'issueDate',
      title: 'Ngày đổi thưởng',
      render: (_: string, record: TRedeem): string =>
        record.issue_date ? formatISODateToDateTime(record.issue_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Ghi chú',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TRedeem): React.ReactElement => (
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

  const getRedeems = useCallback(() => {
    dispatch(
      getRedeemsAction.request({
        params: {
          ...getRedeemsParamsRequest,
          orderStatuses: (getRedeemsParamsRequest?.orderStatuses as unknown as TSelectOption)?.value,
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getRedeemsParamsRequest, currentBranchId]);

  useEffect(() => {
    getRedeems();
  }, [getRedeems]);

  return (
    <div className="Redeems">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Redeems-filter">
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
                  <Col>
                    <Select
                      label="Trạng thái"
                      placeholder="Chọn dữ liệu"
                      value={getRedeemsParamsRequest?.orderStatuses as any}
                      showSearch
                      allowClear
                      options={dataOrderStatusOptions}
                      onChange={(option): void => {
                        setGetRedeemsParamsRequest({
                          ...getRedeemsParamsRequest,
                          page: DEFAULT_PAGE,
                          orderStatuses: option as any,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Redeems-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.ReceiptRefund} color={EIconColor.TUNDORA} />
                      Tổng Đổi Thưởng: <strong>{redeemsState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getRedeemsLoading}
              columns={columns}
              dataSources={redeemsState?.content || []}
              page={getRedeemsParamsRequest?.page}
              pageSize={getRedeemsParamsRequest?.size}
              total={redeemsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalRedeemsForm {...modalRedeemFormState} onClose={handleCloseModalRedeemForm} onSuccess={getRedeems} />
      <ModalDeleteRedeem {...modalDeleteRedeemState} onClose={handleCloseModalDeleteRedeem} onSuccess={getRedeems} />
    </div>
  );
};

export default Redeems;
