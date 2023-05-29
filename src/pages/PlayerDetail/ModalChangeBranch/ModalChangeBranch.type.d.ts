import { TUser } from '@/common/models';

export type TModalChangeBranchProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
