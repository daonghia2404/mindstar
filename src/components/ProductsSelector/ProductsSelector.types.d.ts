import { TProduct } from '@/common/models';
import { TFormFieldProps } from '@/components/FormField';

export type TProductsSelectorProps = TFormFieldProps & {
  value?: TProductSelector[];
  onChange?: (data: TProductSelector[]) => void;
};

export type TProductSelector = {
  label: string;
  value: string | number;
  quantity?: number;
  data: TProduct;
};
