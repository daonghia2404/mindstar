import { TUser } from '@/common/models';

export type TModalResetPasswordProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
};
