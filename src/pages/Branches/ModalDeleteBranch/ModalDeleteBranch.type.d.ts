import { TBranch } from '@/common/models';

export type TModalDeleteBranchProps = {
  visible: boolean;
  data?: TBranch;
  onClose?: () => void;
  onSuccess?: () => void;
};
