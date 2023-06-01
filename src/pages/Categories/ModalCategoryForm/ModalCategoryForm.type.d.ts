import { TCategory } from '@/common/models';

export type TModalCategoryFormProps = {
  visible: boolean;
  data?: TCategory;
  onClose?: () => void;
  onSuccess?: () => void;
};
