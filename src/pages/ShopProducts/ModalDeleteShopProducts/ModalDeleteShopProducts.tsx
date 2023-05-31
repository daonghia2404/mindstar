/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteClassAction, deleteClassAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteShopProductsProps } from './ModalDeleteShopProducts.type';
import './ModalDeleteShopProducts.scss';

const ModalDeleteShopProducts: React.FC<TModalDeleteShopProductsProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteClassLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteClassAction.DELETE_CLASS]);

  const handleSubmit = (): void => {
    dispatch(deleteClassAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteShopProducts"
      title="DELETE"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteClassLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteClassLoading,
      }}
    >
      <div className="ModalDeleteShopProducts-wrapper">
        <div className="Modal-text text-center">Are you sure you want to delete this product?</div>
      </div>
    </Modal>
  );
};

export default ModalDeleteShopProducts;
