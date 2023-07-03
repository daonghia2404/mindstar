import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { EGetProductsAction, EGetSuppliersAction, getProductsAction, getSuppliersAction } from '@/redux/actions';
import { formatCurrency, showNotification, validationRules } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
import { useOptionsPaginate } from '@/utils/hooks';

import { TModalPurchaseOrderFormProps } from './ModalPurchaseOrderForm.type';
import './ModalPurchaseOrderForm.scss';

const ModalPurchaseOrderForm: React.FC<TModalPurchaseOrderFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const {
    options: optionsProducts,
    handleLoadMore: handleLoadMoreProducts,
    handleSearch: handleSearchProducts,
  } = useOptionsPaginate(
    getProductsAction,
    'productReducer',
    'getProductsResponse',
    EGetProductsAction.GET_PRODUCTS,
    'search',
    {},
    undefined,
    visible,
  );

  const {
    options: optionsSuppliers,
    handleLoadMore: handleLoadMoreSuppliers,
    handleSearch: handleSearchSuppliers,
  } = useOptionsPaginate(
    getSuppliersAction,
    'productReducer',
    'getSuppliersResponse',
    EGetSuppliersAction.GET_SUPPLIERS,
    'search',
    {},
    undefined,
    visible,
  );

  const caculateSubTotal = (): number => {
    return (formValues?.quantity || 0) * (formValues?.unitPrice || 0);
  };

  const caculateTotal = (): number => {
    return caculateSubTotal() - (formValues?.shippingFee || 0);
  };

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {};
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Nhập Hàng Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {};
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalPurchaseOrderForm"
      title={data ? 'Sửa Nhập Hàng' : 'Tạo Mới Nhập Hàng'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: false, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: false, onClick: handleSubmit }}
    >
      <div className="ModalRewardForm-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="product" rules={[validationRules.required()]}>
                <Select
                  label="Sản phẩm"
                  active
                  required
                  showSearch
                  placeholder="Chọn dữ liệu"
                  options={optionsProducts}
                  onLoadMore={handleLoadMoreProducts}
                  onSearch={handleSearchProducts}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="supplier" rules={[validationRules.required()]}>
                <Select
                  label="Nhà phân phối"
                  active
                  required
                  showSearch
                  placeholder="Chọn dữ liệu"
                  options={optionsSuppliers}
                  onLoadMore={handleLoadMoreSuppliers}
                  onSearch={handleSearchSuppliers}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="quantity" rules={[validationRules.required()]}>
                <Input label="Số lượng" placeholder="Chọn dữ liệu" required active numberic useNumber />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="unitPrice" rules={[validationRules.required()]}>
                <Input
                  label="Đơn giá"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="shippingFee">
                <Input
                  label="Phí vận chuyển"
                  placeholder="Chọn dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="atDate" rules={[validationRules.required()]}>
                <DatePicker label="Ngày nhập hàng" required placeholder="Chọn dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="ModalPurchaseOrderForm-total">
                Tổng: <strong>{formatCurrency({ amount: caculateTotal(), showSuffix: true })}</strong>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalPurchaseOrderForm;
