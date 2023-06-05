import { TUser } from '@/common/models';

export type TModalDeleteUserProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
