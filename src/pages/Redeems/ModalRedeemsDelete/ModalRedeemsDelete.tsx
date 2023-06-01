/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteClassAction, deleteClassAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalRedeemsDeleteProps } from './ModalRedeemsDelete.type';
import './ModalRedeemsDelete.scss';

const ModalRedeemsDelete: React.FC<TModalRedeemsDeleteProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const RedeemsDeleteLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteClassAction.DELETE_CLASS],
  );

  const handleSubmit = (): void => {
    dispatch(deleteClassAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Sản Phẩm Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalRedeemsDelete"
      title="Xoá Sản Phẩm "
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: RedeemsDeleteLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: RedeemsDeleteLoading,
      }}
    >
      <div className="ModalRedeemsDelete-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá sản phẩm <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalRedeemsDelete;
