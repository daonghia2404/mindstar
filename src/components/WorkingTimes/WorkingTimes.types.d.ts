import { TFormFieldProps } from '@/components/FormField';

export type TWorkingTimesProps = TFormFieldProps & {
  className?: string;
  value?: TWorkTime[];
  onChange?: (data: TWorkTime[]) => void;
};

export type TWorkTime = {
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
};
