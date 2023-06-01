import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Switch from '@/components/Switch';
import { TRootState } from '@/redux/reducers';
import {
  ECreateCategoryAction,
  EUpdateCategoryAction,
  createCategoryAction,
  updateCategoryAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeCategory, ETypeNotification } from '@/common/enums';
import { TModalCategoryFormProps } from './ModalCategoryForm.type';
import TextArea from '@/components/TextArea';

import './ModalCategoryForm.scss';

const ModalCategoryForm: React.FC<TModalCategoryFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const createCategoryLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateCategoryAction.CREATE_CATEGORY],
  );
  const updateCategoryLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateCategoryAction.UPDATE_CATEGORY],
  );
  const loading = createCategoryLoading || updateCategoryLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        description: values?.description || '',
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
        type: ETypeCategory.PRODUCT,
      };

      if (data) {
        dispatch(updateCategoryAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createCategoryAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Danh Mục Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          name: data?.name,
          description: data?.description,
          status: Boolean(data?.auditing_status),
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalCategoryForm"
      title={data ? 'Sửa Danh Mục' : 'Tạo mới Danh Mục'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalCategoryForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description">
                <TextArea label="Mô tả" placeholder="Nhập dữ liệu" active />
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

export default ModalCategoryForm;
