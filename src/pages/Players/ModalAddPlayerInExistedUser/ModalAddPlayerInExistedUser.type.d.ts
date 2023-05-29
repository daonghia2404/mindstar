import { TUser } from '@/common/models';

export type TModalAddPlayerInExistedUserProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSubmit?: () => void;
};
