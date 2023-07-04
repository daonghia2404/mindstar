import { TTagOption } from '@/components/Tags';

export type TTreeTagsProps = {
  options: TTreeTagsOption[];
};

export type TTreeTagsOption = TTagOption & {
  children: TTagOption[];
};
