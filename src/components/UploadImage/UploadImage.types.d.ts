import { TFormFieldProps } from '@/components/FormField';

export type TUploadImageProps = TFormFieldProps & {
  value?: any;
  onChange?: (value: any) => void;
  sizeImage?: number;
  shape?: 'circle' | 'square';
  useUploadAPI?: boolean;
  disabled?: boolean;
};
