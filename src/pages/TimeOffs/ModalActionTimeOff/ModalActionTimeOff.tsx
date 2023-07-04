/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty } from '@/common/enums';

import { TModalActionTimeOffProps } from './ModalActionTimeOff.type';
import './ModalActionTimeOff.scss';

const ModalActionTimeOff: React.FC<TModalActionTimeOffProps> = ({ visible, data, onClose, onSuccess }) => {
  const handleSubmit = (): void => {
    // dispatch(deleteTimeOffAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
    handleSubmitSuccess();
  };

  const handleSubmitSuccess = (): void => {
    // showNotification(ETypeNotification.SUCCESS, 'Duyệt Yêu Cầu Nghỉ Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalActionTimeOff"
      title="Duyệt Yêu Cầu Nghỉ"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: false,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: false,
      }}
    >
      <div className="ModalActionTimeOff-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn duyệt Yêu Cầu Nghỉ của <strong>"{data?.player?.name || EEmpty.DASH}"</strong> không?
        </div>
      </div>
    </Modal>
  );
};

export default ModalActionTimeOff;
