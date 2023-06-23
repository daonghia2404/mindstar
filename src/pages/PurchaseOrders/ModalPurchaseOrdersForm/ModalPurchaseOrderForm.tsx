import React from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import { EUpdateRedeemAction, updateRedeemAction } from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';
import { dataOrderStatusOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';

import { TModalPurchaseOrderFormProps } from './ModalPurchaseOrderForm.type';
import './ModalPurchaseOrderForm.scss';
import DatePicker from '@/components/DatePicker';
import UploadImages from '@/components/UploadImages';

const ModalPurchaseOrderForm: React.FC<TModalPurchaseOrderFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const updatePurchaseOrderLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateRedeemAction.UPDATE_REDEEM],
  );
  const loading = updatePurchaseOrderLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        customer_address: values?.address,
        customer_mobile: values?.phoneNumber,
        note: values?.note,
        player_id: values?.player ? Number(values?.player?.value) : undefined,
        PurchaseOrder_status: values?.status?.value,
        user_id: data?.customer_info?.user_id,
        product_id: data?.product_id,
        customer_name: data?.customer_info?.name,
        point_used: data?.point_used,
        // issue_time: 4600000,
      };

      if (data) {
        dispatch(updateRedeemAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'}  Đổi Thưởng Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  // useEffect(() => {
  //   if (visible) {
  //     handleResetPlayers();

  //     if (data) {
  //       const dataChanged = {
  //         name: data?.product_name,
  //         point: data?.point_used,
  //         status: dataOrderStatusOptions.find((item) => item.value === data?.redeem_status),
  //         branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
  //         account: data?.customer_info
  //           ? { label: data?.customer_info?.name, value: String(data?.customer_info?.id) }
  //           : undefined,
  //         player: data?.player_profile
  //           ? { label: data?.player_profile?.name, value: String(data?.player_profile?.player_id) }
  //           : undefined,
  //         address: data?.player_profile?.address,
  //         phoneNumber: data?.player_profile?.mobile,
  //       };
  //       form.setFieldsValue(dataChanged);
  //     }
  //   } else {
  //     form.resetFields();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visible, form, data]);

  return (
    <Modal
      className="ModalPurchaseOrderForm"
      title={data ? 'Sửa Đơn Hàng' : 'Tạo Mới Đơn Hàng'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalRewardForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="no" rules={[validationRules.required()]}>
                <Input label="Mã đơn hàng" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="images" rules={[validationRules.required()]}>
                <UploadImages label="Ảnh (Tối đa 5 tấm ảnh)" required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="item" rules={[validationRules.required()]}>
                <Select label="Mô tả" placeholder="Chọn dữ liệu" required active showSearch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="supplier" rules={[validationRules.required()]}>
                <Select label="Nhà cung cấp" placeholder="Chọn dữ liệu" required active showSearch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="quantily" rules={[validationRules.required()]}>
                <Input label="Số lương" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="price" rules={[validationRules.required()]}>
                <Input label="Đơn giá" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="cog" rules={[validationRules.required()]}>
                <Input label="Tổng Giá Trị" required placeholder="Nhập dữ liệu" active useNumber numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="shipping" rules={[validationRules.required()]}>
                <Input label="Phí vận chuyển" required placeholder="Nhập dữ liệu" active useNumber numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="expireDate" rules={[validationRules.required()]}>
                <DatePicker label="Ngày tạo" required placeholder="Chọn dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="status" rules={[validationRules.required()]}>
                <Select
                  label="Trạng thái đơn hàng"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={dataOrderStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalPurchaseOrderForm;
