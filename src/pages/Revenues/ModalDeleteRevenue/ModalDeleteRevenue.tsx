/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteTransactionAction, deleteTransactionAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteRevenueProps } from './ModalDeleteRevenue.type';
import './ModalDeleteRevenue.scss';

const ModalDeleteRevenue: React.FC<TModalDeleteRevenueProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteTransactionLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteTransactionAction.DELETE_TRANSACTION],
  );

  const handleSubmit = (): void => {
    dispatch(deleteTransactionAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Hoá đơn Doanh Thu Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteRevenue"
      title="Xoá Doanh Thu"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteTransactionLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteTransactionLoading,
      }}
    >
      <div className="ModalDeleteRevenue-wrapper">
        <div className="Modal-text text-center">
          {data?.title ? (
            <>
              Bạn có chắc chắn muốn xoá Hoá đơn Doanh Thu <strong>"{data?.title || EEmpty.DASH}"</strong> không?
            </>
          ) : (
            <>
              Bạn có chắc chắn muốn xoá Hoá đơn Doanh Thu của <strong>"{data?.buyer?.name || EEmpty.DASH}"</strong>{' '}
              không?
            </>
          )}
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteRevenue;
