import { TSelectOption } from '@/components/Select';

export type TStepStarProps = {
  options?: TSelectOption[];
  value?: TSelectOption;
  onChange?: (data: TSelectOption) => void;
};
