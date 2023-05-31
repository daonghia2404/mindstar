import { TFormFieldProps } from '@/components/FormField';
import { TSelectOption } from '@/components/Select';

export type TMultipleSelectProps = TFormFieldProps & {
  className?: string;
  value?: TSelectOption[];
  options?: TSelectOption[];
  showSearch?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  useAvatarOption?: boolean;
  placeholder?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
  paginate?: {
    page: number;
    pageSize: number;
    total: number;
  };
  onSearch?: (keyword: string) => void;
  onChange?: (option?: TSelectOption[]) => void;
  onLoadMore?: () => void;
};
