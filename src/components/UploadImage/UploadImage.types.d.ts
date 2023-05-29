import { TFormFieldProps } from '@/components/FormField';

export type TUploadImageProps = TFormFieldProps & {
  value?: any;
  sizeImage?: number;
  shape?: 'circle' | 'square';
  disabled?: boolean;
  onChange?: (value: any) => void;
};
