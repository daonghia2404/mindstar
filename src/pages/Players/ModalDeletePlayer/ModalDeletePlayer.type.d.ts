import { TUser } from '@/common/models';

export type TModalDeletePlayerProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
