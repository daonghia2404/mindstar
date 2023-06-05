/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteSupplierAction, deleteSupplierAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteSupplierProps } from './ModalDeleteSupplier.type';
import './ModalDeleteSupplier.scss';

const ModalDeleteSupplier: React.FC<TModalDeleteSupplierProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteSupplierLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteSupplierAction.DELETE_SUPPLIER],
  );

  const handleSubmit = (): void => {
    dispatch(deleteSupplierAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Nhà Phân Phối Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteSupplier"
      title="Xoá Nhà Phân Phối"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteSupplierLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteSupplierLoading,
      }}
    >
      <div className="ModalDeleteSupplier-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Nhà Phân Phối <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteSupplier;
