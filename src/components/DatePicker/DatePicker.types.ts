import { Moment } from 'moment';
import { TFormFieldProps } from '@/components/FormField';

export type TDatePickerProps = TFormFieldProps & {
  className?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  format?: string;
  showTime?: boolean;
  onChange?: (value: any) => void;
  disabledDate?: (current: Moment) => boolean;
};
