import React from 'react';
import { Button as AntdButton } from 'antd';
import classNames from 'classnames';
import { navigate } from '@reach/router';

import { TButtonProps } from '@/components/Button/Button.types';
import Icon from '@/components/Icon';

import './Button.scss';

const Button: React.FC<TButtonProps> = ({
  className,
  size,
  iconName,
  shadow = true,
  iconColor,
  type,
  htmlType,
  title,
  danger,
  reverse,
  link,
  disabled,
  loading,
  styleType,
  style,
  onClick,
}) => {
  const handleClickButton = (): void => {
    if (link) navigate(link);
    else onClick?.();
  };
  return (
    <div
      className={classNames('Button', className, styleType, { shadow, 'only-icon': !title && iconName, reverse })}
      style={style}
    >
      <AntdButton
        size={size}
        type={type}
        htmlType={htmlType}
        onClick={handleClickButton}
        danger={danger}
        disabled={disabled}
        loading={loading}
      >
        {iconName && (
          <div className="Button-icon">
            <Icon name={iconName} color={iconColor} />
          </div>
        )}
        {title && <span className="Button-title">{title}</span>}
      </AntdButton>
    </div>
  );
};

export default Button;
