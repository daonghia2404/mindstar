import { TFormFieldProps } from '@/components/FormField';

export type TWorkingTimesProps = TFormFieldProps & {
  className?: string;
  value?: TWorkTime[];
  showTime?: boolean;
  onChange?: (data: TWorkTime[]) => void;
};

export type TWorkTime = {
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
};
