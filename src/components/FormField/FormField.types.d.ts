import { CSSProperties } from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TFormFieldProps = {
  label?: string;
  className?: string;
  required?: boolean;
  size?: SizeType;
  active?: boolean;
  focused?: boolean;
  suffixIcon?: React.ReactNode;
  suffixText?: React.ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
  active?: boolean;
  readOnlyText?: boolean;
  renderShowValue?: React.ReactNode;
  onClick?: () => void;
  onBlur?: () => void;
};
