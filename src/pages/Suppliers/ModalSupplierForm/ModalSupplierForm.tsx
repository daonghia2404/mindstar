import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateSupplierAction,
  EUpdateSupplierAction,
  createSupplierAction,
  updateSupplierAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import Switch from '@/components/Switch';

import { TModalSupplierFormProps } from './ModalSupplierForm.type';
import './ModalSupplierForm.scss';

const ModalShopSuppliers: React.FC<TModalSupplierFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createSupplierLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateSupplierAction.CREATE_SUPPLIER],
  );
  const updateSupplierLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateSupplierAction.UPDATE_SUPPLIER],
  );

  const loading = createSupplierLoading || updateSupplierLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        contact_name: values?.companyName,
        contact_number: values?.phoneNumber,
        address: values?.address,
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
      };

      if (data) {
        dispatch(updateSupplierAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createSupplierAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Nhà Phân Phối Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          companyName: data?.contact_name,
          phoneNumber: data?.contact_number,
          address: data?.address,
          status: Boolean(data.auditing_status),
        };
        form.setFieldsValue(dataChanged);
      } else {
        const dataChanged = {
          status: true,
        };
        form.setFieldsValue(dataChanged);
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalShopSuppliers"
      title={data ? 'Sửa Nhà Phân Phối' : 'Tạo mới Nhà Phân Phối'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalShopSuppliers-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="companyName" rules={[validationRules.required()]}>
                <Input label="Tên công ty / doanh nghiệp" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" rules={[validationRules.required()]}>
                <TextArea label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            {data && (
              <Col span={24}>
                <Form.Item name="status">
                  <Switch label="Trạng thái" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalShopSuppliers;
