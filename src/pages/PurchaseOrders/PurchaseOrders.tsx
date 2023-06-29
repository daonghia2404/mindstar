import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty, EFormat } from '@/common/enums';
import { EGetInventoryHistoriesAction, getInventoryHistoriesAction } from '@/redux/actions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import ModalPurchaseOrdersForm from './ModalPurchaseOrdersForm';
import ModalDeletePurchaseOrder from './ModalPurchaseOrdersDelete';
import { TGetInventoryHistoriesParams } from '@/services/api';
import { TInventoryHistory } from '@/common/models';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import Status, { EStatusStyleType } from '@/components/Status';

import './PurchaseOrders.scss';
import ModalExpenseForm from '@/pages/Expenses/ModalExpenseForm';

const PurchaseOrders: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPurchaseOrdersLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES],
  );
  const purchaseOrdersState = useSelector(
    (state: TRootState) => state.inventoryReducer.getInventoryHistoriesResponse,
  )?.data;

  const [getPurchaseOrdersParamsRequest, setGetPurchaseOrdersParamsRequest] = useState<TGetInventoryHistoriesParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const [modalPurchaseOrderFormState, setModalPurchaseOrderFormState] = useState<{
    visible: boolean;
    data?: TInventoryHistory;
  }>({
    visible: false,
  });
  const [modalDeletePurchaseOrderstate, setModalDeletePurchaseOrderstate] = useState<{
    visible: boolean;
    data?: TInventoryHistory;
  }>({
    visible: false,
  });
  const [modalExpenseFormState, setModalExpenseFormState] = useState<{
    visible: boolean;
    dataInventoryHistory?: TInventoryHistory;
  }>({
    visible: false,
  });

  const handleOpenModalExpenseForm = (data?: TInventoryHistory): void => {
    setModalExpenseFormState({ visible: true, dataInventoryHistory: data });
  };

  const handleCloseModalExpenseForm = (): void => {
    setModalExpenseFormState({ visible: false });
  };

  const handleOpenModalPurchaseOrderForm = (data?: TInventoryHistory): void => {
    setModalPurchaseOrderFormState({ visible: true, data });
  };
  const handleCloseModalPurchaseOrderForm = (): void => {
    setModalPurchaseOrderFormState({ visible: false });
  };
  const handleOpenModalDeletePurchaseOrder = (data?: TInventoryHistory): void => {
    setModalDeletePurchaseOrderstate({ visible: true, data });
  };
  const handleCloseModalDeletePurchaseOrder = (): void => {
    setModalDeletePurchaseOrderstate({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPurchaseOrdersParamsRequest({
      ...getPurchaseOrdersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetPurchaseOrdersParamsRequest({
      ...getPurchaseOrdersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const dataTableDropdownActions = (data?: TInventoryHistory): TDropdownMenuItem[] => [
    {
      value: 'create-expense',
      label: 'Tạo mới Chi Phí',
      icon: EIconName.Coins,
      hide: Boolean(data?.expense?.id),
      onClick: (): void => {
        handleOpenModalExpenseForm(data);
      },
    },
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalPurchaseOrderForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeletePurchaseOrder(data);
      },
    },
  ];

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (_: string, record: TInventoryHistory): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(record?.product?.image)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: TInventoryHistory): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title ellipsis-2">{record?.product?.name || EEmpty.DASH}</div>
            <div className="Table-info-description">Nhà phân phối: {record?.supplier?.name || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Số lượng nhập',
      render: (_: string, record: TInventoryHistory): string => String(record?.quantities_in_hand || EEmpty.ZERO),
    },
    {
      key: 'unit',
      dataIndex: 'unit',
      title: 'Đơn giá',
      className: 'nowrap',
      render: (_: string, record: TInventoryHistory): string =>
        formatCurrency({ amount: record.unit_price || EEmpty.ZERO, showSuffix: true }),
    },
    {
      key: 'shippingFee',
      dataIndex: 'shippingFee',
      title: 'Phí vận chuyển',
      className: 'nowrap',
      render: (_: string, record: TInventoryHistory): string =>
        formatCurrency({ amount: record.shipping_fee || EEmpty.ZERO, showSuffix: true }),
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: 'Tổng giá trị',
      className: 'nowrap',
      render: (_: string, record: TInventoryHistory): string =>
        formatCurrency({ amount: record.total || EEmpty.ZERO, showSuffix: true }),
    },
    {
      key: 'atDate',
      dataIndex: 'atDate',
      title: 'Ngày nhập',
      className: 'nowrap',
      render: (_: string, record: TInventoryHistory): string =>
        record?.at_date ? formatISODateToDateTime(record.at_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TInventoryHistory): React.ReactElement => {
        const isPaid = record?.expense?.id;
        return (
          <Status
            label={isPaid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
            styleType={isPaid ? EStatusStyleType.SUCCESS : EStatusStyleType.DANGER}
          />
        );
      },
    },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Ghi chú',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TInventoryHistory): React.ReactElement => (
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

  const getPurchaseOrders = useCallback(() => {
    dispatch(
      getInventoryHistoriesAction.request({
        params: getPurchaseOrdersParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getPurchaseOrdersParamsRequest, currentBranchId]);

  useEffect(() => {
    getPurchaseOrders();
  }, [getPurchaseOrders]);

  return (
    <div className="PurchaseOrders">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="PurchaseOrders-filter">
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
          <Card className="PurchaseOrders-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.PackageImport} color={EIconColor.TUNDORA} />
                      Tổng Nhập Hàng: <strong>{purchaseOrdersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Nhập Hàng"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalPurchaseOrderForm}
                    />
                  </Col>
                </Row>
              }
              loading={getPurchaseOrdersLoading}
              columns={columns}
              dataSources={purchaseOrdersState?.content || []}
              page={getPurchaseOrdersParamsRequest?.page}
              pageSize={getPurchaseOrdersParamsRequest?.size}
              total={purchaseOrdersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalPurchaseOrdersForm
        {...modalPurchaseOrderFormState}
        onClose={handleCloseModalPurchaseOrderForm}
        onSuccess={getPurchaseOrders}
      />
      <ModalDeletePurchaseOrder
        {...modalDeletePurchaseOrderstate}
        onClose={handleCloseModalDeletePurchaseOrder}
        onSuccess={getPurchaseOrders}
      />
      <ModalExpenseForm
        {...modalExpenseFormState}
        onClose={handleCloseModalExpenseForm}
        onSuccess={getPurchaseOrders}
      />
    </div>
  );
};

export default PurchaseOrders;
