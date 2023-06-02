/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteRedeemAction, deleteRedeemAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteRedeemProps } from './ModalDeleteRedeem.type';
import './ModalDeleteRedeem.scss';

const ModalDeleteRedeem: React.FC<TModalDeleteRedeemProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteRedeemLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteRedeemAction.DELETE_REDEEM],
  );

  const handleSubmit = (): void => {
    dispatch(deleteRedeemAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Đổi Thưởng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteRedeem"
      title="Xoá Đổi Thưởng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteRedeemLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteRedeemLoading,
      }}
    >
      <div className="ModalDeleteRedeem-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Đổi Thưởng của <strong>"{data?.player_profile?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteRedeem;
