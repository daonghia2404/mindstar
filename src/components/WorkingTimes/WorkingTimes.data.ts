import { EDayOfWeek } from '@/common/enums';

export const defaultWorkingTimesStart = '09:00:00';
export const defaultWorkingTimesEnd = '10:30:00';

export const dataWorkingTimesDefault = [
  {
    dayOfWeek: EDayOfWeek.MONDAY,
    startTime: defaultWorkingTimesStart,
    endTime: defaultWorkingTimesEnd,
  },
];
