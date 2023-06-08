/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteBusStopAction, deleteBusStopAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { TModalDeleteBusStopProps } from './ModalDeleteBusStop.type';

import './ModalDeleteBusStop.scss';

const ModalDeleteBusStop: React.FC<TModalDeleteBusStopProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteBusStopLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteBusStopAction.DELETE_BUS_STOP],
  );

  const handleSubmit = (): void => {
    dispatch(deleteBusStopAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Điểm Đón Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteBusStop"
      title="Xoá Điểm Đón"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteBusStopLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteBusStopLoading,
      }}
    >
      <div className="ModalDeleteBusStop-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Điểm Đón <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteBusStop;
