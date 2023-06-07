import { Moment } from 'moment';
import { TFormFieldProps } from '@/components/FormField';

export type TDatePickerProps = TFormFieldProps & {
  className?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  format?: string;
  showNow?: boolean;
  showTime?: boolean;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  onChange?: (value: any) => void;
  disabledDate?: (current: Moment) => boolean;
};
