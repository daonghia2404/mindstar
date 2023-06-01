/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteProductAction, deleteProductAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteProductProps } from './ModalDeleteProduct.type';
import './ModalDeleteProduct.scss';

const ModalDeleteProduct: React.FC<TModalDeleteProductProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteProductAction.DELETE_PRODUCT],
  );

  const handleSubmit = (): void => {
    dispatch(deleteProductAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Sản Phẩm Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteProduct"
      title="Xoá Sản Phẩm"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteProductLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteProductLoading,
      }}
    >
      <div className="ModalDeleteProduct-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Sản Phẩm "{data?.name || EEmpty.DASH}" không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;
