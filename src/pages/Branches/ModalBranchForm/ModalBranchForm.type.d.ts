import { TBranch } from '@/common/models';

export type TModalBranchFormProps = {
  visible: boolean;
  data?: TBranch;
  onClose?: () => void;
  onSuccess?: () => void;
};
