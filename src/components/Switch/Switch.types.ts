import { TFormFieldProps } from '@/components/FormField';

export type TSwitchProps = TFormFieldProps & {
  value?: boolean;
  onChange?: (value: boolean) => void;
};
