/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteRewardAction, deleteRewardAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteRewardProps } from './ModalDeleteReward.type';
import './ModalDeleteReward.scss';

const ModalDeleteReward: React.FC<TModalDeleteRewardProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteRewardLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteRewardAction.DELETE_REWARD],
  );

  const handleSubmit = (): void => {
    dispatch(deleteRewardAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Phần Thưởng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteReward"
      title="Xoá Phần Thưởng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteRewardLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteRewardLoading,
      }}
    >
      <div className="ModalDeleteReward-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Phần Thưởng <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteReward;
