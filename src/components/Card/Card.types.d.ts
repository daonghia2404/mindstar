import { EIconName } from '@/components/Icon';

export type TCardProps = {
  title?: string;
  className?: string;
  suffixTitle?: React.ReactNode;
  suffixLink?: {
    icon?: EIconName;
    label?: string;
    link: string;
  };
};
