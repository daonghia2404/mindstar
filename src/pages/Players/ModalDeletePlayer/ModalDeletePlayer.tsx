/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeletePlayerAction, deletePlayerAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeletePlayerProps } from './ModalDeletePlayer.type';
import './ModalDeletePlayer.scss';

const ModalDeletePlayer: React.FC<TModalDeletePlayerProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deletePlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeletePlayerAction.DELETE_PLAYER],
  );

  const handleSubmit = (): void => {
    dispatch(deletePlayerAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Học Viên Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeletePlayer"
      title="Xoá Học Viên"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deletePlayerLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deletePlayerLoading,
      }}
    >
      <div className="ModalDeletePlayer-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Học Viên <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeletePlayer;
