/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { EDeleteMerchantAction, deleteMerchantAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalDeleteConnectProps } from './ModalDeleteConnect.type';
import './ModalDeleteConnect.scss';

const ModalDeleteConnect: React.FC<TModalDeleteConnectProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const deleteMerchantLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteMerchantAction.DELETE_MERCHANT],
  );

  const handleSubmit = (): void => {
    dispatch(deleteMerchantAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá Cửa Hàng Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalDeleteConnect"
      title="Xoá Cửa Hàng"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.GENERAL_FORM,
        disabled: deleteMerchantLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.DANGER,
        disabled: deleteMerchantLoading,
      }}
    >
      <div className="ModalDeleteConnect-wrapper">
        <div className="Modal-text text-center">
          Bạn có chắc chắn muốn xoá Cửa Hàng <strong>"{data?.name || EEmpty.DASH}"</strong> không?
          <br />
          Dữ liệu đã xoá không thể khôi phục.
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteConnect;
