/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { EButtonStyleType } from '@/components/Button';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';
import { EUpdateMerchantFeedAction, updateMerchantFeedAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

import { TModalChangeStatusMerchantFeedProps } from './ModalChangeStatusMerchantFeed.type';
import './ModalChangeStatusMerchantFeed.scss';

const ModalChangeStatusMerchantFeed: React.FC<TModalChangeStatusMerchantFeedProps> = ({
  visible,
  data,
  checked,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const updateMerchantFeedLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED],
  );

  const handleSubmit = (): void => {
    dispatch(
      updateMerchantFeedAction.request(
        {
          body: { auditing_status: checked ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE },
          paths: { id: data?.id || '' },
        },
        handleSubmitSuccess,
      ),
    );
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Thay Đổi Trạng Thái Bài Viết Thành Công !');
    onClose?.();
    onSuccess?.();
  };

  return (
    <Modal
      className="ModalChangeStatusMerchantFeed"
      title="Thay đổi trạng thái Bài Viết"
      visible={visible}
      onClose={onClose}
      width={400}
      cancelButton={{
        title: 'Huỷ Bỏ',
        onClick: onClose,
        styleType: EButtonStyleType.PURPLE_TRANSPARENT,
        disabled: updateMerchantFeedLoading,
      }}
      confirmButton={{
        title: 'Đồng Ý',
        onClick: handleSubmit,
        styleType: EButtonStyleType.PURPLE,
        disabled: updateMerchantFeedLoading,
      }}
    >
      <div className="ModalChangeStatusMerchantFeed-wrapper">
        <div className="Modal-text text-center">Bạn có chắc chắn muốn thay đổi trạng thái bài viết này không?</div>
      </div>
    </Modal>
  );
};

export default ModalChangeStatusMerchantFeed;
