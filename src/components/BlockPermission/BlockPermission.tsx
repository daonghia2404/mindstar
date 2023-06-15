import React from 'react';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Button, { EButtonStyleType } from '@/components/Button';

import { TBlockPermissionProps } from './BlockPermission.types.d';
import './BlockPermission.scss';

const BlockPermission: React.FC<TBlockPermissionProps> = ({ title, buttonProps }) => {
  return (
    <div className="BlockPermission flex flex-col justify-center items-center">
      <div className="BlockPermission-icon">
        <Icon name={EIconName.ShieldCancel} color={EIconColor.DOVE_GRAY} />
      </div>
      <div className="BlockPermission-text text-center">{title}</div>
      {buttonProps && <Button styleType={EButtonStyleType.PURPLE} iconColor={EIconColor.WHITE} {...buttonProps} />}
    </div>
  );
};

export default BlockPermission;
