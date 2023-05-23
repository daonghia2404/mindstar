import { TFormFieldProps } from '@/components/FormField';

export type TInputProps = TFormFieldProps & {
  className?: string;
  type?: 'text' | 'password';
  value?: string;
  numberic?: boolean;
  useNumber?: boolean;
  useComma?: boolean;
  placeholder?: string;
  onSearch?: (value?: string) => void;
  onChange?: (value: string | number) => void;
  onEnter?: () => void;
};
