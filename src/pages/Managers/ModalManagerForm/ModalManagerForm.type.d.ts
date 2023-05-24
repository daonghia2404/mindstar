import { TUser } from '@/common/models';

export type TModalManagerFormProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
