/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteManagerAction, deleteManagerAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteManagerProps } from './ModalDeleteManager.type';
import './ModalDeleteManager.scss';

const ModalDeleteManager: React.FC<TModalDeleteManagerProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteManagerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteManagerAction.DELETE_MANAGER],
  );

  const handleSubmit = (): void => {
    dispatch(deleteManagerAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Giáo Viên Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteManager"
      title="Xoá Giáo Viên"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteManagerLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteManagerLoading,
      }}
    >
      <div className="ModalDeleteManager-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Giáo Viên <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteManager;
