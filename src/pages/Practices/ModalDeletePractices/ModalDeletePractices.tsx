/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeletePracticeAction, deletePracticeAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeletePracticesProps } from './ModalDeletePractices.type';
import './ModalDeletePractices.scss';

const ModalDeletePractices: React.FC<TModalDeletePracticesProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deletePracticeLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeletePracticeAction.DELETE_PRACTICE],
  );

  const handleSubmit = (): void => {
    dispatch(deletePracticeAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Học Thử Viên Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeletePractices"
      title="Xoá Học Thử Viên"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deletePracticeLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deletePracticeLoading,
      }}
    >
      <div className="ModalDeletePractices-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Học Thử Viên <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeletePractices;
