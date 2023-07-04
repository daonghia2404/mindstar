/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EResetPasswordAction, resetPasswordAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalResetPasswordProps } from './ModalResetPassword.type';
import './ModalResetPassword.scss';

const ModalResetPassword: React.FC<TModalResetPasswordProps> = ({ visible, data, onClose }) => {
  const dispatch = useDispatch();
  // const [formValues, setFormValues] = useState<any>({});
  const [form] = Form.useForm();

  const resetPasswordLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EResetPasswordAction.RESET_PASSWORD],
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      dispatch(
        resetPasswordAction.request(
          { body: { user_name: data?.user_name, password: values?.password } },
          handleSubmitSuccess,
        ),
      );
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Đặt lại mật khẩu thành công !');
    onClose?.();
  };

  return (
    <Modal
      className="ModalResetPassword"
      title="Đặt Lại Mật Khẩu"
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.PURPLE_TRANSPARENT,
        disabled: resetPasswordLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.PURPLE,
        disabled: resetPasswordLoading,
      }}
    >
      <div className="ModalResetPassword-wrapper">
        <div className="Modal-text text-center">
          Bạn có muốn đặt lại mật khẩu cho tài khoản <strong>"{data?.user_name || EEmpty.DASH}"</strong> không?
          <br />
          Mật khẩu được đặt lại sẽ có giá trị là <strong>"abcd1234"</strong>
        </div>
      </div>
      {/* <div className="ModalResetPassword-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="password" rules={[validationRules.required(), validationRules.minLength(8)]}>
                <Input label="Mật khẩu mới" required type="password" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="confirmPassword"
                rules={[
                  validationRules.required(),
                  validationRules.minLength(8),
                  validationRules.confirmPassword(formValues?.password),
                ]}
              >
                <Input label="Nhập lại Mật khẩu mới" required type="password" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div> */}
    </Modal>
  );
};

export default ModalResetPassword;
