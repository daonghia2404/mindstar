/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteBranchAction, deleteBranchAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { TModalDeleteCategoryProps } from './ModalDeleteCategory.type';

import './ModalDeleteCategory.scss';

const ModalDeleteCategory: React.FC<TModalDeleteCategoryProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteCategoryLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteBranchAction.DELETE_BRANCH],
  );

  const handleSubmit = (): void => {
    dispatch(deleteBranchAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Chi Nhánh Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteCategory"
      title="Xoá Chi Nhánh"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteCategoryLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteCategoryLoading,
      }}
    >
      <div className="ModalDeleteCategory-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Chi Nhánh <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteCategory;
