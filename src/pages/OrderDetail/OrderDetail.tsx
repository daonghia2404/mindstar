import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { navigate, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Input from '@/components/Input';
import UploadImage from '@/components/UploadImage';
import { Paths } from '@/pages/routers';
import { getOrderAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { EEmpty, EFormat } from '@/common/enums';
import { formatCurrency, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import { dataOrderStatusOptions, dataPaymentTypeOptions, dataTransactionStatusOptions } from '@/common/constants';
import Status from '@/components/Status';
import { TOrder, TProduct } from '@/common/models';
import ModalDeleteOrder from '@/pages/Orders/ModalDeleteOrder';
import ModalOrderForm from '@/pages/Orders/ModalOrderForm';

import './OrderDetail.scss';
import Avatar from '@/components/Avatar';
import Table from '@/components/Table';

const OrderDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));
  const orderState = useSelector((state: TRootState) => state.orderReducer.getOrderResponse)?.data;

  const [modalOrderFormState, setModalOrderFormState] = useState<{ visible: boolean; data?: TOrder }>({
    visible: false,
  });
  const [modalDeleteOrderState, setModalDeleteOrderState] = useState<{ visible: boolean; data?: TOrder }>({
    visible: false,
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

  const handleBack = (): void => {
    navigate(Paths.Orders);
  };

  const caculateTotalPriceProducts = (): number => {
    const totalPriceProducts = orderState?.items
      ?.filter((item) => item.quantity && item.quantity > 0)
      ?.map((item) => (item?.selling_price || item?.amount) * (item.quantity || 0))
      ?.reduce((result: number, item: number) => {
        return result + item;
      });

    return totalPriceProducts || 0;
  };

  const orderInfo = {
    avatar: orderState?.customer_info ? getFullUrlStatics(orderState.customer_info?.avatar) : undefined,
    name: orderState?.customer_info?.player_name || orderState?.customer_info?.name || EEmpty.DASH,
    phoneNumber: orderState?.customer_info?.mobile || EEmpty.DASH,
    address: orderState?.customer_info?.address || EEmpty.DASH,
    city: cityOptions?.find((item) => item.value === orderState?.customer_info?.user?.city?.id)?.label || EEmpty.DASH,
    orderStatus: ((): React.ReactNode => {
      const status = dataOrderStatusOptions.find((item) => item.value === orderState?.order_status);
      return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : EEmpty.DASH;
    })(),
    transactionStatus: ((): React.ReactNode => {
      const status = dataTransactionStatusOptions.find((item) => item.value === orderState?.transaction_status);
      return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : EEmpty.DASH;
    })(),
    createDate: orderState?.create_date
      ? formatISODateToDateTime(orderState.create_date, EFormat['DD/MM/YYYY - HH:mm'])
      : EEmpty.DASH,
    note: orderState?.note || EEmpty.DASH,
  };

  const columns = [
    {
      key: 'products',
      dataIndex: 'products',
      title: 'Sản Phẩm',
      className: 'limit-width-large',
      render: (_: string, record: TProduct): React.ReactElement => {
        return (
          <Row gutter={[8, 8]} align="middle">
            <Col>
              <Avatar shape="square" image={getFullUrlStatics(record.product_image_path)} size={48} defaultImage />
            </Col>
            <Col>
              <div className="Table-info">
                <div className="Table-info-title ellipsis-2">{record.product_name || EEmpty.DASH}</div>
                <div className="Table-info-description">Số lượng: {record.quantity || EEmpty.ZERO}</div>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: 'total',
      dataIndex: 'total',
      title: 'Tổng giá trị',
      className: 'text-right nowrap',
      render: (_: string, record: TProduct): React.ReactElement => {
        return (
          <div className="Table-info text-right">
            <div className="Table-info-title">
              {formatCurrency({
                amount: record.amount || EEmpty.ZERO,
                showSuffix: true,
              })}
            </div>
            <div className="Table-info-description">
              {dataPaymentTypeOptions.find((item) => item.value === orderState?.payment_type)?.label || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
  ];

  const getOrder = useCallback(() => {
    if (id) dispatch(getOrderAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <div className="OrderDetail">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <div className="Admin-back" onClick={handleBack}>
                <Icon name={EIconName.ArrowLongLeft} color={EIconColor.DOVE_GRAY} />
                Quay lại
              </div>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    title="Sửa"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.Pencil}
                    iconColor={EIconColor.WHITE}
                    onClick={(): void => handleOpenModalOrderForm(orderState)}
                  />
                </Col>
                <Col>
                  <Button
                    title="Xoá"
                    styleType={EButtonStyleType.DANGER_TRANSPARENT}
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.POMEGRANATE}
                    onClick={(): void => handleOpenModalDeleteOrder(orderState)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
          <Card title="Thông tin khách hàng">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <UploadImage label="Ảnh đại diện" readOnlyText active value={orderInfo?.avatar} shape="circle" />
              </Col>
              <Col span={12}>
                <Input label="Họ và tên" readOnlyText active value={orderInfo?.name} />
              </Col>
              <Col span={12}>
                <Input label="Số điện thoại" readOnlyText active value={orderInfo?.phoneNumber} />
              </Col>
              <Col span={12}>
                <Input label="Địa chỉ" readOnlyText active value={orderInfo?.address} />
              </Col>
              <Col span={12}>
                <Input label="Thành phố" readOnlyText active value={orderInfo?.city} />
              </Col>
              <Col span={12}>
                <Input label="Trạng thái đơn hàng" readOnlyText active renderShowValue={orderInfo?.orderStatus} />
              </Col>
              <Col span={12}>
                <Input
                  label="Trạng thái thanh toán"
                  readOnlyText
                  active
                  renderShowValue={orderInfo?.transactionStatus}
                />
              </Col>
              <Col span={12}>
                <Input label="Ngày tạo" readOnlyText active value={orderInfo?.createDate} />
              </Col>
              <Col span={24}>
                <Input label="Ghi chú" readOnlyText active value={orderInfo?.note} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
          <Card title="Thông tin sản phẩm">
            <Table columns={columns} dataSources={orderState?.items || []} showPagination={false} />

            <div className="OrderDetail-total flex justify-end">
              <table>
                <tr>
                  <td>
                    <div className="Table-info-description">Giá trị sản phẩm: </div>
                  </td>
                  <td>
                    <div className="Table-info-description">
                      <strong>{formatCurrency({ amount: caculateTotalPriceProducts(), showSuffix: true })}</strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="Table-info-description">Phí giao hàng: </div>
                  </td>
                  <td>
                    <div className="Table-info-description">
                      <strong>
                        {formatCurrency({ amount: orderState?.shipping_fee || EEmpty.ZERO, showSuffix: true })}
                      </strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="Table-info-description">Giảm giá: </div>
                  </td>
                  <td>
                    <div className="Table-info-description">
                      <strong>
                        {formatCurrency({ amount: orderState?.discount_value || EEmpty.ZERO, showSuffix: true })}
                      </strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="Table-info-title">Tổng giá trị đơn hàng: </div>
                  </td>
                  <td>
                    <div className="Table-info-title">
                      <strong>
                        {formatCurrency({ amount: orderState?.transaction_amount || EEmpty.ZERO, showSuffix: true })}
                      </strong>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <ModalOrderForm {...modalOrderFormState} onClose={handleCloseModalOrderForm} onSuccess={getOrder} />
      <ModalDeleteOrder {...modalDeleteOrderState} onClose={handleCloseModalDeleteOrder} onSuccess={handleBack} />
    </div>
  );
};

export default OrderDetail;
