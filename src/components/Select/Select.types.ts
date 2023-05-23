import { TFormFieldProps } from '@/components/FormField';

export type TSelectProps = TFormFieldProps & {
  className?: string;
  value?: TSelectOption;
  options?: TSelectOption[];
  showSearch?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
  paginate?: {
    page: number;
    pageSize: number;
    total: number;
  };
  onSearch?: (keyword: string) => void;
  onChange?: (option?: TSelectOption) => void;
  onLoadMore?: () => void;
};

export type TSelectOption = {
  label: string;
  value: string;
  data?: any;
  disabled?: boolean;
};
