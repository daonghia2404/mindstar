/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty } from '@/common/enums';

import { TModalAddPlayerInExistedUserProps } from './ModalAddPlayerInExistedUser.type';
import './ModalAddPlayerInExistedUser.scss';

const ModalAddPlayerInExistedUser: React.FC<TModalAddPlayerInExistedUserProps> = ({
  visible,
  data,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      className="ModalAddPlayerInExistedUser"
      title="Tài Khoản Tồn Tại"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.PURPLE_TRANSPARENT,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: onSubmit,
        styleType: EButtonStyleType.PURPLE,
      }}
    >
      <div className="ModalAddPlayerInExistedUser-wrapper">
        <div className="Modal-text text-center">
          Tài khoản <strong>"{data?.user_name || EEmpty.DASH}"</strong> đã tồn tại trong hệ thống.
          <br />
          Bạn có muốn thêm học viên vào tài khoản này không?
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddPlayerInExistedUser;
