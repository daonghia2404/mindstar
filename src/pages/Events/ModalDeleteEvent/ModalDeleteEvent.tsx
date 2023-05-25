/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteEventAction, deleteEventAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteEventProps } from './ModalDeleteEvent.type';
import './ModalDeleteEvent.scss';

const ModalDeleteEvent: React.FC<TModalDeleteEventProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteEventLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteEventAction.DELETE_EVENT]);

  const handleSubmit = (): void => {
    dispatch(deleteEventAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Sự Kiện Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteEvent"
      title="Xoá Sự Kiện"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteEventLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteEventLoading,
      }}
    >
      <div className="ModalDeleteEvent-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Sự Kiện <strong>"{data?.title || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteEvent;
