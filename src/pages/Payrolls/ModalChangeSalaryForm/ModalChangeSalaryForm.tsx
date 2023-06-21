import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';

import { TModalChangeSalaryFormProps } from './ModalChangeSalaryForm.type';
import './ModalChangeSalaryForm.scss';

const ModalChangeSalaryForm: React.FC<TModalChangeSalaryFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const loading = false;

  const handleSubmit = (): void => {
    form.validateFields().then(() => {
      // const body = {};

      if (data) {
        // dispatch(updateOrderAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        // dispatch(createOrderAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `Cập Nhật Khoản Lương Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {};
        form.setFieldsValue(dataChanged);
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalChangeSalaryForm"
      title="Thay Đổi Khoản Lương"
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalChangeSalaryForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="increaseSalary">
                <Input
                  active
                  label="Khoản tăng lương"
                  placeholder="Nhập dữ liệu"
                  useNumber
                  useComma
                  numberic
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="reduceSalary">
                <Input
                  active
                  label="Khoản giảm lương"
                  placeholder="Nhập dữ liệu"
                  useNumber
                  useComma
                  numberic
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalChangeSalaryForm;
