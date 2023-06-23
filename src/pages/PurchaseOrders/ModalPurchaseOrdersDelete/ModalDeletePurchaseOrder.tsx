/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { deleteRedeemAction, EDeleteRedeemAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeletePurchaseOrderProps } from './ModalDeletePurchaseOrder.type';
import './ModalDeletePurchaseOrder.scss';

const ModalDeletePurchaseOrder: React.FC<TModalDeletePurchaseOrderProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deletePurchaseOrderLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteRedeemAction.DELETE_REDEEM],
  );

  const handleSubmit = (): void => {
    dispatch(deleteRedeemAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Đơn Hàng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeletePurchaseOrder"
      title="Xoá Đơn Hàng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deletePurchaseOrderLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deletePurchaseOrderLoading,
      }}
    >
      <div className="ModalDeletePurchaseOrder-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Đơn Hàng của <strong>"{data?.player_profile?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeletePurchaseOrder;
