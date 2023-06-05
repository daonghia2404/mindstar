/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteUserAction, deleteUserAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteUserProps } from './ModalDeleteUser.type';
import './ModalDeleteUser.scss';

const ModalDeleteUser: React.FC<TModalDeleteUserProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteUserLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteUserAction.DELETE_USER]);

  const handleSubmit = (): void => {
    dispatch(deleteUserAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Người Dùng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteUser"
      title="Xoá Người Dùng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteUserLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteUserLoading,
      }}
    >
      <div className="ModalDeleteUser-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Người Dùng <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
