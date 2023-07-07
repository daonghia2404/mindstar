import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  ECreateOrderAction,
  EGetBranchesAction,
  EGetPlayersAction,
  EUpdateOrderAction,
  createOrderAction,
  getBranchesAction,
  getOrderAction,
  getPlayersAction,
  updateOrderAction,
} from '@/redux/actions';
import { formatCurrency, showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import { useOptionsPaginate } from '@/utils/hooks';
import { dataOrderStatusOptions, dataPaymentTypeOptions, dataTransactionStatusOptions } from '@/common/constants';
import Switch from '@/components/Switch';
import ProductsSelector, { TProductSelector } from '@/components/ProductsSelector';

import { TModalOrderFormProps } from './ModalOrderForm.type';
import './ModalOrderForm.scss';

const ModalOrderForm: React.FC<TModalOrderFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const orderState = useSelector((state: TRootState) => state.orderReducer.getOrderResponse)?.data;

  const [formValues, setFormValues] = useState<any>({});

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(
    getBranchesAction,
    'branchReducer',
    'getBranchesResponse',
    EGetBranchesAction.GET_BRANCHES,
    'branchName',
    undefined,
    undefined,
    visible,
  );

  const {
    options: optionsPlayers,
    handleLoadMore: handleLoadMorePlayers,
    handleSearch: handleSearchPlayers,
    handleReset: handleResetPlayers,
  } = useOptionsPaginate(
    getPlayersAction,
    'playerReducer',
    'getPlayersResponse',
    EGetPlayersAction.GET_PLAYERS,
    undefined,
    {
      auditingStatuses: EAuditingStatus.ACTIVE,
    },
    { branchIds: formValues?.branch?.value || '' },
    visible && Boolean(formValues?.branch?.value),
  );

  const createOrderLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateOrderAction.CREATE_ORDER]);
  const updateOrderLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateOrderAction.UPDATE_ORDER]);
  const loading = createOrderLoading || updateOrderLoading;

  const caculateTotalPrice = (): number => {
    const totalPriceProducts = formValues?.products
      ?.filter((item: TProductSelector) => item.quantity && item.quantity > 0)
      ?.map((item: TProductSelector) => (item?.data?.selling_price || item?.data?.amount) * (item.quantity || 0))
      ?.reduce((result: number, item: number) => {
        return result + item;
      });

    return totalPriceProducts - (formValues?.shippingFee || 0) - (formValues?.discount || 0) || 0;
  };

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        player_id: values?.player ? Number(values?.player?.value) : undefined,
        user_id: values?.player?.data?.user_id ? Number(values?.player?.data?.user_id) : undefined,
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        order_time: data?.order_time || moment().valueOf(),
        order_status: values?.orderStatus?.value,
        note: values?.note,
        customer_name: values?.customerName,
        customer_address: values?.address,
        customer_mobile: values?.phoneNumber,
        shipping_fee: values?.shippingFee,
        discount_value: values?.discount,
        payment_type: values?.paymentType?.value,
        transaction_status: values?.paymentStatus?.value,
        order_items: values?.products
          ?.filter((item: TProductSelector) => item.quantity && item.quantity > 0)
          ?.map((item: TProductSelector) => ({
            product_id: item.value,
            quantity: item.quantity,
          })),
      };

      if (data) {
        dispatch(updateOrderAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createOrderAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Đơn Hàng Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (formValues?.branch?.value) handleResetPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.branch?.value]);

  useEffect(() => {
    if (visible) {
      if (data && orderState) {
        const dataChanged = {
          branch: orderState?.branch
            ? { label: orderState?.branch?.name, value: String(orderState?.branch?.id) }
            : undefined,
          products: data?.items?.map((item) => ({
            label: item.product_name,
            value: item.product_id,
            quantity: item.quantity,
            data: item,
          })),
          isPlayer: Boolean(data?.customer_info?.player_id),
          player: data?.customer_info?.player_id
            ? {
                label: data?.customer_info?.player_name,
                value: data?.customer_info?.player_id,
                data: { ...data?.customer_info?.user, user_id: data?.customer_info?.user_id },
              }
            : undefined,
          customerName: data?.customer_info?.name,
          address: data?.customer_info?.address,
          phoneNumber: data?.customer_info?.mobile,
          orderStatus: dataOrderStatusOptions.find((item) => item.value === data?.order_status),
          paymentStatus: dataTransactionStatusOptions.find((item) => item.value === data?.transaction_status),
          paymentType: dataPaymentTypeOptions.find((item) => item.value === data?.payment_type),
          shippingFee: data?.shipping_fee,
          discount: data?.discount_value,
          note: data?.note,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          isPlayer: true,
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, orderState, data]);

  const getOrder = useCallback(() => {
    if (visible && data) {
      dispatch(getOrderAction.request({ paths: { id: data?.id || '' } }));
    }
  }, [dispatch, data, visible]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <Modal
      className="ModalOrderForm"
      title={data ? 'Sửa Đơn Hàng' : 'Tạo Mới Đơn Hàng'}
      visible={visible}
      onClose={onClose}
      width={700}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalOrderForm-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="products" rules={[validationRules.required()]}>
                <ProductsSelector label="Sản phẩm" required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="isPlayer">
                <Switch
                  label="Người mua là học viên"
                  onChange={(checked): void => {
                    const dataChanged = {
                      isPlayer: checked,
                      player: undefined,
                      customerName: undefined,
                      address: undefined,
                      phoneNumber: undefined,
                    };
                    setFormValues({ ...formValues, ...dataChanged });
                    form.setFieldsValue(dataChanged);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="branch" rules={[validationRules.required()]}>
                <Select
                  label="Chi nhánh"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={optionsBranches}
                  onLoadMore={handleLoadMoreBranches}
                  onSearch={handleSearchBranches}
                  onChange={(option): void => {
                    const dataChanged = {
                      branch: option,
                      player: undefined,
                    };

                    setFormValues({ ...formValues, ...dataChanged });
                    form.setFieldsValue(dataChanged);
                  }}
                />
              </Form.Item>
            </Col>
            {formValues?.branch && formValues?.isPlayer && (
              <Col span={24}>
                <Form.Item name="player" rules={[validationRules.required()]}>
                  <Select
                    label="Học viên"
                    placeholder="Chọn dữ liệu"
                    required
                    active
                    showSearch
                    options={optionsPlayers}
                    onLoadMore={handleLoadMorePlayers}
                    onSearch={handleSearchPlayers}
                    onChange={(option): void => {
                      const dataChanged = {
                        player: option,
                        address: option?.data?.address,
                        phoneNumber: option?.data?.mobile,
                      };
                      setFormValues({ ...formValues, ...dataChanged });
                      form.setFieldsValue(dataChanged);
                    }}
                  />
                </Form.Item>
              </Col>
            )}
            {!formValues?.isPlayer && (
              <Col span={24}>
                <Form.Item name="customerName" rules={[validationRules.required()]}>
                  <Input label="Tên khách hàng" required placeholder="Nhập dữ liệu" active />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item name="address" rules={[validationRules.required()]}>
                <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active disabled={formValues?.isPlayer} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input
                  label="Số điện thoại"
                  required
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  disabled={formValues?.isPlayer}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="orderStatus" rules={[validationRules.required()]}>
                <Select
                  label="Trạng thái đơn hàng"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  options={dataOrderStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="paymentStatus" rules={[validationRules.required()]}>
                <Select
                  label="Trạng thái thanh toán"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  options={dataTransactionStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="paymentType" rules={[validationRules.required()]}>
                <Select
                  label="Loại thanh toán"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  options={dataPaymentTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="shippingFee">
                <Input
                  label="Phí vận chuyển"
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="discount">
                <Input label="Giảm giá" placeholder="Nhập dữ liệu" active numberic useNumber useComma suffixText="đ" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="ModalOrderForm-total">
                Tổng: <strong>{formatCurrency({ amount: caculateTotalPrice(), showSuffix: true })}</strong>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalOrderForm;
