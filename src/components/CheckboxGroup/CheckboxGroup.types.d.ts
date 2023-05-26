import { TFormFieldProps } from '@/components/FormField';
import { TSelectOption } from '@/components/Select';

export type TCheckboxGroupProps = TFormFieldProps & {
  options?: TSelectOption[];
  value?: TSelectOption[];
  onChange?: (data: TSelectOption[]) => void;
};
