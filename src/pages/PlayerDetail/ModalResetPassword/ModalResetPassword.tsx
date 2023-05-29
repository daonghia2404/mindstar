/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';

import { TModalResetPasswordProps } from './ModalResetPassword.type';
import './ModalResetPassword.scss';
import { EResetPasswordAction, resetPasswordAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

const ModalResetPassword: React.FC<TModalResetPasswordProps> = ({ visible, data, onClose }) => {
  const dispatch = useDispatch();

  const resetPasswordLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EResetPasswordAction.RESET_PASSWORD],
  );

  const handleSubmit = (): void => {
    dispatch(resetPasswordAction.request({ body: { user_name: data?.user_name } }, handleSubmitSuccess));
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
      width={400}
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
    </Modal>
  );
};

export default ModalResetPassword;
