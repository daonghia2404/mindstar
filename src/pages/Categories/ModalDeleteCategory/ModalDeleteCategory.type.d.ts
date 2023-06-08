import { TCategory } from '@/common/models';

export type TModalDeleteCategoryProps = {
  visible: boolean;
  data?: TCategory;
  onClose?: () => void;
  onSuccess?: () => void;
};
