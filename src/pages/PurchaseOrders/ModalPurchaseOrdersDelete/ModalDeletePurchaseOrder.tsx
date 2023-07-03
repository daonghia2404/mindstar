/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { showNotification } from '@/utils/functions';

import { TModalDeletePurchaseOrderProps } from './ModalDeletePurchaseOrder.type';
import './ModalDeletePurchaseOrder.scss';

const ModalDeletePurchaseOrder: React.FC<TModalDeletePurchaseOrderProps> = ({ visible, data, onClose, onSuccess }) => {
  const handleSubmit = (): void => {};

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Lịch Sử Nhập Hàng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeletePurchaseOrder"
      title="Xoá Lịch Sử Nhập Hàng"
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
      <div className="ModalDeletePurchaseOrder-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá lịch sử Nhập Hàng của sản phẩm{' '}
          <strong>"{data?.product?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeletePurchaseOrder;
