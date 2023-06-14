import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import { TGetMerchantsParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataAuditingStatusOptions } from '@/common/constants';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { TMerchant } from '@/common/models';
import { TRootState } from '@/redux/reducers';
import { EGetMerchantsAction, getMerchantsAction } from '@/redux/actions';
import Avatar from '@/components/Avatar';
import { getFullUrlStatics } from '@/utils/functions';
import Status from '@/components/Status';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import Button, { EButtonStyleType } from '@/components/Button';
import ModalDeleteConnect from '@/pages/Connects/ModalDeleteConnect';
import { Paths } from '@/pages/routers';

import './Connects.scss';

const Connects: React.FC = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getMerchantsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetMerchantsAction.GET_MERCHANTS],
  );
  const [getMerchantsParamsRequest, setGetMerchantsParamsRequest] = useState<TGetMerchantsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    registrationStatuses: `${EAuditingStatus.ACTIVE}`,
  });
  const merchantsState = useSelector((state: TRootState) => state.merchantReducer.getMerchantsResponse)?.data;

  const [modalDeleteMerchantState, setModalDeleteMerchantState] = useState<{ visible: boolean; data?: TMerchant }>({
    visible: false,
  });

  const handleOpenModalDeleteMerchant = (data?: TMerchant): void => {
    setModalDeleteMerchantState({ visible: true, data });
  };

  const handleCloseModalDeleteMerchant = (): void => {
    setModalDeleteMerchantState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetMerchantsParamsRequest({
      ...getMerchantsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetMerchantsParamsRequest({
      ...getMerchantsParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const dataTableDropdownActions = (data?: TMerchant): TDropdownMenuItem[] => [
    {
      value: 'view',
      label: 'Chi Tiết',
      icon: EIconName.Eye,
      onClick: (): void => {
        navigate(Paths.ConnectDetail(String(data?.id)));
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteMerchant(data);
      },
    },
  ];

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (_: string, record: TMerchant): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(record?.cover_image)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      keySort: 'name',
      sorter: true,
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      render: (value: string, record: TMerchant): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{value || EEmpty.DASH}</div>
          <div className="Table-info-description">
            {cityOptions?.find((item) => item.value === record.city_id)?.label || EEmpty.DASH}
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      dataIndex: 'contact',
      title: 'Liên hệ',
      render: (_: string, record: TMerchant): React.ReactElement => (
        <Row gutter={[16, 16]} align="middle" wrap={false}>
          <Col>
            <Avatar size={48} image={getFullUrlStatics(record.avatar)} />
          </Col>
          <Col>
            <div className="Table-info">
              <div className="Table-info-title">{record?.account_name || EEmpty.DASH}</div>
              {record.mobile ? (
                <a href={`tel: ${record.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
                  {record.mobile}
                </a>
              ) : (
                <>{EEmpty.DASH}</>
              )}
            </div>
          </Col>
        </Row>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TMerchant): React.ReactElement => {
        const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TMerchant): React.ReactElement => (
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

  const getMerchants = useCallback(() => {
    dispatch(
      getMerchantsAction.request({ params: getMerchantsParamsRequest, headers: { branchIds: currentBranchId } }),
    );
  }, [dispatch, getMerchantsParamsRequest, currentBranchId]);

  useEffect(() => {
    getMerchants();
  }, [getMerchants]);

  return (
    <div className="Connects">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Merchants-filter">
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
          <Card className="Merchants-table">
            <div className="Connects-filter">
              <Row gutter={[16, 16]}>
                <Col>
                  <div className="Table-total-item">
                    <Icon name={EIconName.Affiliate} color={EIconColor.TUNDORA} />
                    Tổng E-Connects: <strong>{merchantsState?.total_elements || EEmpty.ZERO}</strong>
                  </div>
                </Col>
              </Row>
            </div>
            <Table
              loading={getMerchantsLoading}
              columns={columns}
              dataSources={merchantsState?.content || []}
              page={getMerchantsParamsRequest.page}
              pageSize={getMerchantsParamsRequest.size}
              total={merchantsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalDeleteConnect
        {...modalDeleteMerchantState}
        onClose={handleCloseModalDeleteMerchant}
        onSuccess={getMerchants}
      />
    </div>
  );
};

export default Connects;
