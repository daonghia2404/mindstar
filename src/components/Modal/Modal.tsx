import React from 'react';
import { Modal as AntdModal } from 'antd';
import classNames from 'classnames';

import { TModalProps } from '@/components/Modal/Modal.types';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';

import './Modal.scss';

const Modal: React.FC<TModalProps> = ({
  visible,
  cancelButton,
  confirmButton,
  centered,
  width,
  wrapClassName,
  className,
  hideFooter,
  children,
  title,
  onClose,
  onSubmit,
}) => {
  return (
    <AntdModal
      footer={null}
      title={null}
      visible={visible}
      width={width}
      centered={centered}
      onCancel={onClose}
      wrapClassName={classNames('Modal-wrapper', wrapClassName)}
      className={classNames('Modal', className)}
      closable={false}
      closeIcon={<Icon name={EIconName.X} color={EIconColor.DOVE_GRAY} />}
    >
      {title && (
        <div className="Modal-header">
          <div className="Modal-header-title">{title}</div>
        </div>
      )}
      <div className="Modal-body">{children}</div>

      {!hideFooter && (
        <div
          className={classNames('Modal-footer flex justify-center', {
            single: (confirmButton && !cancelButton) || (!confirmButton && cancelButton),
          })}
        >
          {confirmButton && <Button onClick={onSubmit} styleType={EButtonStyleType.PURPLE} {...confirmButton} />}
          {cancelButton && (
            <Button onClick={onClose} styleType={EButtonStyleType.PURPLE_TRANSPARENT} {...cancelButton} />
          )}
        </div>
      )}
    </AntdModal>
  );
};

export default Modal;
