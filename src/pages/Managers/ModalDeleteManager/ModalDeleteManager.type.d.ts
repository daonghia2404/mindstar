import { TUser } from '@/common/models';

export type TModalDeleteManagerProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
