import { TFormFieldProps } from '@/components/FormField';

export type TUploadImagesProps = TFormFieldProps & {
  value?: TUploadImages[];
  onChange?: (data: TUploadImages[]) => void;
};

export type TUploadImages = {
  value: string;
  fileIndex?: number;
  url?: string;
  file?: any;
  delete?: boolean;
};
