import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import classNames from 'classnames';

import FormField from '@/components/FormField';

import { TSwitchProps } from './Switch.types';
import './Switch.scss';

const Switch: React.FC<TSwitchProps> = ({
  label,
  required,
  size,
  className,
  value,
  readOnlyText,
  disabled,
  style,
  onChange,
}) => {
  return (
    <FormField
      label={label}
      required={required}
      size={size}
      readOnlyText={readOnlyText}
      className={classNames('Switch', className)}
      active
      disabled={disabled}
      style={style}
    >
      <AntdSwitch checked={value} onChange={onChange} />
    </FormField>
  );
};

export default Switch;
