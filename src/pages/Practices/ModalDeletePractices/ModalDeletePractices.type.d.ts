import { TUser } from '@/common/models';

export type TModalDeletePracticesProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
