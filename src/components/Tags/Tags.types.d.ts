import { TSelectOption } from '@/components/Select';

export type TTagOption = TSelectOption & {
  onClick?: (data: TSelectOption) => void;
};

export type TTagsProps = {
  className?: string;
  noStyle?: boolean;
  ellipsis?: boolean;
  nowrap?: boolean;
  options?: TTagOption[];
};
