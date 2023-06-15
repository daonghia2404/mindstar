import { EIconName } from '@/components/Icon';

export type TCardProps = {
  title?: string;
  description?: React.ReactNode;
  className?: string;
  suffixTitle?: React.ReactNode;
  suffixLink?: {
    icon?: EIconName;
    label?: string;
    link: string;
  };
};
