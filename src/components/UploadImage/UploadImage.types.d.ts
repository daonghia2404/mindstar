import { TFormFieldProps } from '@/components/FormField';

export type TUploadImageProps = TFormFieldProps & {
  value?: any;
  sizeImage?: number;
  shape?: 'circle' | 'square';
  disabled?: boolean;
  autoSize?: boolean;
  defaultImage?: boolean;
  objectFitContain?: boolean;
  onChange?: (value: any) => void;
};
