import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

export type TCheckboxProps = {
  className?: string;
  label?: React.ReactNode;
  value?: boolean;
  size?: SizeType;
  onChange?: (checked: boolean) => void;
};
