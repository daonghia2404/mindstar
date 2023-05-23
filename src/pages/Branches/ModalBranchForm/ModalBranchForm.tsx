import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import { TRootState } from '@/redux/reducers';
import { ECreateBranchAction, EUpdateBranchAction, createBranchAction, updateBranchAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';

import { TModalBranchFormProps } from './ModalBranchForm.type';
import './ModalBranchForm.scss';

const ModalBranchForm: React.FC<TModalBranchFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const createBranchLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateBranchAction.CREATE_BRANCH],
  );
  const updateBranchLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateBranchAction.UPDATE_BRANCH],
  );
  const loading = createBranchLoading || updateBranchLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        address: values?.address,
        city_id: values?.city?.value,
        auditing_status: values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
        academy_id: 1,
      };

      if (data) {
        dispatch(updateBranchAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createBranchAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Chi Nhánh Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: data?.name,
        city: cityOptions?.find((item) => item.value === data?.city?.id),
        address: data?.address,
        status: Boolean(data?.auditing_status),
      });
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalBranchForm"
      title={data ? 'Sửa Chi Nhánh' : 'Tạo mới Chi Nhánh'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalBranchForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name">
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address">
                <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city">
                <Select label="Thành phố" required options={cityOptions} placeholder="Chọn dữ liệu" active showSearch />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item name="hotline">
                <Input label="Hotline" required numberic placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col> */}
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

export default ModalBranchForm;
