import { EIconName } from '@/components/Icon';

export type TCardProps = {
  title?: string;
  className?: string;
  suffixLink?: {
    icon?: EIconName;
    label?: string;
    link: string;
  };
};
