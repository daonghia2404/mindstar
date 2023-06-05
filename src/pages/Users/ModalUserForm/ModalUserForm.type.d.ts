import { TUser } from '@/common/models';

export type TModalUserFormProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
