import { Moment } from 'moment';
import { TFormFieldProps } from '@/components/FormField';

export type TDatePickerProps = TFormFieldProps & {
  allowEmpty?: [boolean, boolean];
  className?: string;
  value?: any;
  placeholder?: any;
  disabled?: boolean;
  allowClear?: boolean;
  format?: string;
  showNow?: boolean;
  showTime?: boolean;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  range?: boolean;
  onChange?: (value: any) => void;
  disabledDate?: (current: Moment) => boolean;
};
