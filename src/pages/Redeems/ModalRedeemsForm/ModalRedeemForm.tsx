import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import { EGetPlayersAction, EUpdateRedeemAction, getPlayersAction, updateRedeemAction } from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';
import { useOptionsPaginate } from '@/utils/hooks';
import { dataOrderStatusOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';

import { TModalRedeemFormProps } from './ModalRedeemForm.type';
import './ModalRedeemForm.scss';

const ModalRedeemForm: React.FC<TModalRedeemFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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
      userIds: data?.customer_info?.user_id,
      auditingStatuses: EAuditingStatus.ACTIVE,
    },
  );

  const updateRedeemLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateRedeemAction.UPDATE_REDEEM],
  );
  const loading = updateRedeemLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        customer_address: values?.address,
        customer_mobile: values?.phoneNumber,
        note: values?.note,
        player_id: values?.player ? Number(values?.player?.value) : undefined,
        redeem_status: values?.status?.value,
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

  useEffect(() => {
    if (visible) {
      handleResetPlayers();

      if (data) {
        const dataChanged = {
          name: data?.product_name,
          point: data?.point_used,
          status: dataOrderStatusOptions.find((item) => item.value === data?.redeem_status),
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          account: data?.customer_info
            ? { label: data?.customer_info?.name, value: String(data?.customer_info?.id) }
            : undefined,
          player: data?.player_profile
            ? { label: data?.player_profile?.name, value: String(data?.player_profile?.player_id) }
            : undefined,
          address: data?.player_profile?.address,
          phoneNumber: data?.player_profile?.mobile,
        };
        form.setFieldsValue(dataChanged);
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalRedeemForm"
      title={data ? 'Sửa Đổi Thưởng' : 'Tạo Mới Đổi Thưởng'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalRedeemForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="name">
                <Input label="Tên phần thưởng" placeholder="Nhập dữ liệu" active disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="point">
                <Input label="Số điểm đổi thưởng" placeholder="Nhập dữ liệu" active disabled numberic useNumber />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="status" rules={[validationRules.required()]}>
                <Select
                  label="Trạng thái đổi thưởng"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={dataOrderStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="branch">
                <Select label="Chi nhánh" placeholder="Nhập dữ liệu" active disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="account">
                <Select label="Tài khoản" placeholder="Nhập dữ liệu" active disabled />
              </Form.Item>
            </Col>
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
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" rules={[validationRules.required()]}>
                <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
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

export default ModalRedeemForm;
