/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteTimeOffAction, deleteTimeOffAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteTimeOffProps } from './ModalDeleteTimeOff.type';
import './ModalDeleteTimeOff.scss';

const ModalDeleteTimeOff: React.FC<TModalDeleteTimeOffProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteTimeOffLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteTimeOffAction.DELETE_TIME_OFF],
  );

  const handleSubmit = (): void => {
    dispatch(deleteTimeOffAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Yêu Cầu Nghỉ Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteTimeOff"
      title="Xoá Yêu Cầu Nghỉ"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteTimeOffLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteTimeOffLoading,
      }}
    >
      <div className="ModalDeleteTimeOff-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Yêu Cầu Nghỉ của <strong>"{data?.player?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteTimeOff;
