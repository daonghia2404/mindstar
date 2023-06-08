/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteBusStopPlayerAction, deleteBusStopPlayerAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { TModalDeleteBusStopPlayerProps } from './ModalDeleteBusStopPlayer.type';

import './ModalDeleteBusStopPlayer.scss';

const ModalDeleteBusStopPlayer: React.FC<TModalDeleteBusStopPlayerProps> = ({
  visible,
  data,
  dataBusStop,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const deleteBusStopPlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER],
  );

  const handleSubmit = (): void => {
    dispatch(deleteBusStopPlayerAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Rời Học Viên Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteBusStopPlayer"
      title="Rời Học Viên"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteBusStopPlayerLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteBusStopPlayerLoading,
      }}
    >
      <div className="ModalDeleteBusStopPlayer-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn rời Học Viên <strong>"{data?.player?.name || EEmpty.DASH}"</strong> khỏi Điểm Đón{' '}
          <strong>"{dataBusStop?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteBusStopPlayer;
