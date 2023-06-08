/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteExpenseAction, deleteExpenseAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteExpenseProps } from './ModalDeleteExpense.type';
import './ModalDeleteExpense.scss';

const ModalDeleteExpense: React.FC<TModalDeleteExpenseProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteExpenseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteExpenseAction.DELETE_EXPENSE],
  );

  const handleSubmit = (): void => {
    dispatch(deleteExpenseAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Hoá đơn Chi Phí Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteExpense"
      title="Xoá Chi Phí"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteExpenseLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteExpenseLoading,
      }}
    >
      <div className="ModalDeleteExpense-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Hoá đơn Chi Phí danh mục <strong>"{data?.category?.name || EEmpty.DASH}"</strong>{' '}
          này không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteExpense;
