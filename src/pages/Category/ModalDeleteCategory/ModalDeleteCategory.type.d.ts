import { TBranch } from '@/common/models';

export type TModalDeleteCategoryProps = {
  visible: boolean;
  data?: TBranch;
  onClose?: () => void;
  onSuccess?: () => void;
};
