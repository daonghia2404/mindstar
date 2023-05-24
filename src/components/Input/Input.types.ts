import { CSSProperties } from 'react';
import { TFormFieldProps } from '@/components/FormField';

export type TInputProps = TFormFieldProps & {
  className?: string;
  type?: 'text' | 'password';
  value?: string;
  numberic?: boolean;
  useNumber?: boolean;
  useComma?: boolean;
  placeholder?: string;
  styleForm?: CSSProperties;
  onSearch?: (value?: string) => void;
  onChange?: (value: string | number) => void;
  onEnter?: () => void;
};
