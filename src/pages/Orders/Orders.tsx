import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import moment, { Moment } from 'moment';

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  dataOrderStatusOptions,
  dataPaymentTypeOptions,
  dataTransactionStatusOptions,
} from '@/common/constants';
import { TOrder } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetOrdersAction, getOrdersAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetOrdersParams } from '@/services/api';
import Select, { TSelectOption } from '@/components/Select';
import ModalOrderForm from './ModalOrderForm';
import ModalDeleteOrder from './ModalDeleteOrder';
import Status from '@/components/Status';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import { LayoutPaths, Paths } from '@/pages/routers';
import DatePicker from '@/components/DatePicker';

import './Orders.scss';

const Orders: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getOrdersLoading = useSelector((state: TRootState) => state.loadingReducer[EGetOrdersAction.GET_ORDERS]);
  const ordersState = useSelector((state: TRootState) => state.orderReducer.getOrdersResponse)?.data;

  const [modalOrderFormState, setModalOrderFormState] = useState<{ visible: boolean; data?: TOrder }>({
    visible: false,
  });
  const [modalDeleteOrderState, setModalDeleteOrderState] = useState<{ visible: boolean; data?: TOrder }>({
    visible: false,
  });

  const [getOrdersParamsRequest, setGetOrdersParamsRequest] = useState<TGetOrdersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const handleOpenModalOrderForm = (data?: TOrder): void => {
    setModalOrderFormState({ visible: true, data });
  };

  const handleCloseModalOrderForm = (): void => {
    setModalOrderFormState({ visible: false });
  };

  const handleOpenModalDeleteOrder = (data?: TOrder): void => {
    setModalDeleteOrderState({ visible: true, data });
  };

  const handleCloseModalDeleteOrder = (): void => {
    setModalDeleteOrderState({ visible: false });
  };

  const handleSearch = (keyword?: string): void => {
    setGetOrdersParamsRequest({
      ...getOrdersParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetOrdersParamsRequest({
      ...getOrdersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const dataTableDropdownActions = (data?: TOrder): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalOrderForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteOrder(data);
      },
    },
  ];

  const handleExportPdfFile = (): void => {
    window.open(
      `${LayoutPaths.View}${Paths.PdfOrders}?fromDate=${getOrdersParamsRequest?.fromDate || ''}&toDate=${
        getOrdersParamsRequest?.toDate || ''
      }&branchId=${currentBranchId}`,
      '_blank',
    );
  };

  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Mã đơn hàng',
      render: (_: string, record: TOrder): string => `ORD${record.id}`,
    },
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TOrder): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.customer_info?.avatar)} />
        </div>
      ),
    },
    {
      key: 'customer',
      dataIndex: 'customer',
      title: 'Khách Hàng',
      className: 'limit-width',
      sorter: true,
      keySort: 'customer_name',
      render: (_: string, record: TOrder): React.ReactElement => {
        return (
          <div className="Table-info">
            {record?.customer_info?.player_id ? (
              <Link to={Paths.PlayerDetail(String(record?.customer_info?.player_id))} className="Table-info-title">
                {record?.customer_info?.player_name}
              </Link>
            ) : (
              <>
                {record?.customer_info?.name && <div className="Table-info-title">{record?.customer_info?.name}</div>}
              </>
            )}

            <div className="Table-info-description ellipsis-2">{record?.customer_info?.address || EEmpty.DASH}</div>

            {record?.customer_info?.mobile ? (
              <a
                href={`tel: ${record?.customer_info?.mobile}`}
                className="Table-link"
                onClick={(e): void => e.stopPropagation()}
              >
                {record?.customer_info?.mobile}
              </a>
            ) : (
              <div className="Table-info-description">{EEmpty.DASH}</div>
            )}
          </div>
        );
      },
    },
    {
      key: 'products',
      dataIndex: 'products',
      title: 'Sản Phẩm',
      className: 'limit-width-large',
      render: (_: string, record: TOrder): React.ReactElement => {
        const isEmpty = record.items?.length === 0;
        if (isEmpty) return <>{EEmpty.DASH}</>;

        return (
          <Row className="Orders-products">
            {record.items?.map((item) => (
              <Col span={24}>
                <div className="Orders-products-item flex items-center">
                  <Avatar shape="square" image={getFullUrlStatics(item.product_image_path)} size={48} defaultImage />
                  <div className="Table-info">
                    <div className="Table-info-title ellipsis-2">{item.product_name || EEmpty.DASH}</div>
                    <div className="Table-info-description">Số lượng: {item.quantity || EEmpty.ZERO}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: 'Tổng giá trị',
      sorter: true,
      className: 'nowrap',
      keySort: 'transaction_amount',
      render: (_: string, record: TOrder): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">
              {formatCurrency({ amount: record.transaction_amount || EEmpty.ZERO, showSuffix: true })}
            </div>
            <div className="Table-info-description">
              {dataPaymentTypeOptions.find((item) => item.value === record?.payment_type)?.label || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'createDate',
      dataIndex: 'createDate',
      title: 'Ngày tạo',
      sorter: true,
      keySort: 'order_time',
      className: 'nowrap',
      render: (_: string, record: TOrder): string =>
        record?.create_date ? formatISODateToDateTime(record.create_date, EFormat['DD/MM/YYYY - HH:mm']) : EEmpty.DASH,
    },
    {
      key: 'paymentStatus',
      dataIndex: 'paymentStatus',
      title: 'Trạng thái thanh toán',
      sorter: true,
      keySort: 'transaction_status',
      render: (_: string, record: TOrder): React.ReactElement => {
        const status = dataTransactionStatusOptions.find((item) => item.value === record.transaction_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      title: 'Trạng Thái đơn hàng',
      sorter: true,
      keySort: 'order_status',
      render: (_: string, record: TOrder): React.ReactElement => {
        const status = dataOrderStatusOptions.find((item) => item.value === record.order_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'note',
      dataIndex: 'note',
      title: 'Ghi Chú',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TOrder): React.ReactElement => (
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

  const getOrders = useCallback(() => {
    dispatch(
      getOrdersAction.request({
        params: {
          ...getOrdersParamsRequest,
          orderStatus: (getOrdersParamsRequest?.orderStatus as unknown as TSelectOption)?.value,
          transactionStatuses: (getOrdersParamsRequest?.transactionStatuses as unknown as TSelectOption)?.value,
          fromDate: getOrdersParamsRequest?.fromDate,
          toDate: getOrdersParamsRequest?.toDate,
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getOrdersParamsRequest, currentBranchId]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="Orders">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Orders-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col>
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
                      label="Trạng thái đơn hàng"
                      placeholder="Chọn dữ liệu"
                      value={getOrdersParamsRequest?.orderStatus as any}
                      allowClear
                      showSearch
                      options={dataOrderStatusOptions}
                      onChange={(option): void => {
                        setGetOrdersParamsRequest({
                          ...getOrdersParamsRequest,
                          page: DEFAULT_PAGE,
                          orderStatus: option as any,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Trạng thái thanh toán"
                      placeholder="Chọn dữ liệu"
                      value={getOrdersParamsRequest?.transactionStatuses as any}
                      allowClear
                      showSearch
                      options={dataTransactionStatusOptions}
                      onChange={(option): void => {
                        setGetOrdersParamsRequest({
                          ...getOrdersParamsRequest,
                          page: DEFAULT_PAGE,
                          transactionStatuses: option as any,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <DatePicker
                  allowEmpty={[true, true]}
                  active
                  range
                  style={{ minWidth: '18rem' }}
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                  allowClear
                  value={
                    getOrdersParamsRequest?.fromDate && getOrdersParamsRequest?.toDate
                      ? [moment(getOrdersParamsRequest?.fromDate), moment(getOrdersParamsRequest?.toDate)]
                      : undefined
                  }
                  label="Ngày"
                  onChange={(data: Moment[]): void => {
                    setGetOrdersParamsRequest({
                      ...getOrdersParamsRequest,
                      page: DEFAULT_PAGE,
                      fromDate: data?.[0]?.clone()?.startOf('day')?.valueOf(),
                      toDate: data?.[1]?.clone()?.endOf('day')?.valueOf(),
                    });
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Orders-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.Receipt} color={EIconColor.TUNDORA} />
                      Tổng Đơn Hàng:
                      <strong>{ordersState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Row gutter={[16, 16]}>
                      <Col>
                        <Button
                          title="Tải File PDF"
                          styleType={EButtonStyleType.OUTLINE_PURPLE}
                          iconName={EIconName.Pdf}
                          iconColor={EIconColor.WHITE}
                          onClick={handleExportPdfFile}
                        />
                      </Col>
                      <Col>
                        <Button
                          title="Tạo mới Đơn hàng"
                          styleType={EButtonStyleType.PURPLE}
                          iconName={EIconName.Plus}
                          iconColor={EIconColor.WHITE}
                          onClick={handleOpenModalOrderForm}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              loading={getOrdersLoading}
              columns={columns}
              dataSources={ordersState?.content || []}
              page={getOrdersParamsRequest?.page}
              pageSize={getOrdersParamsRequest?.size}
              total={ordersState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalOrderForm {...modalOrderFormState} onClose={handleCloseModalOrderForm} onSuccess={getOrders} />
      <ModalDeleteOrder {...modalDeleteOrderState} onClose={handleCloseModalDeleteOrder} onSuccess={getOrders} />
    </div>
  );
};

export default Orders;
