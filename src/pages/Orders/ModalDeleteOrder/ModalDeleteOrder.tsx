/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteOrderAction, deleteOrderAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteOrderProps } from './ModalDeleteOrder.type';
import './ModalDeleteOrder.scss';

const ModalDeleteOrder: React.FC<TModalDeleteOrderProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteOrderLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteOrderAction.DELETE_ORDER]);

  const handleSubmit = (): void => {
    dispatch(deleteOrderAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Đơn Hàng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteOrder"
      title="Xoá Đơn Hàng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteOrderLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteOrderLoading,
      }}
    >
      <div className="ModalDeleteOrder-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Đơn Hàng của{' '}
          <strong>"{data?.customer_info?.player_name || data?.customer_info?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteOrder;
