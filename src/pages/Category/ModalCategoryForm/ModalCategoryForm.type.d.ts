import { TBranch } from '@/common/models';

export type TModalCategoryFormProps = {
  visible: boolean;
  data?: TBranch;
  onClose?: () => void;
  onSuccess?: () => void;
};
