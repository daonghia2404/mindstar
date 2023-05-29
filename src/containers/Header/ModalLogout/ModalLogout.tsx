/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { navigate } from '@reach/router';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import Helpers from '@/services/helpers';
import { LayoutPaths } from '@/pages/routers';

import { TModalLogoutProps } from './ModalLogout.type';
import './ModalLogout.scss';

const ModalLogout: React.FC<TModalLogoutProps> = ({ visible, onClose }) => {
  const handleSubmit = (): void => {
    Helpers.clearTokens();
    Helpers.setDataBranch({});
    navigate(LayoutPaths.Auth);
  };

  return (
    <Modal
      className="ModalLogout"
      title="Đăng xuất"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{ title: 'Huỷ Bỏ', onClick: onClose, styleType: EButtonStyleType.GENERAL_FORM }}
      confirmButton={{ title: 'Đồng Ý', onClick: handleSubmit, styleType: EButtonStyleType.DANGER }}
    >
      <div className="ModalLogout-wrapper">
        <div className="Modal-text text-center">Bạn có chắc chắn muốn đăng xuất tài khoản ra khỏi thiết bị này?</div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
