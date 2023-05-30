import { TUser } from '@/common/models';

export type TModalPlayerFormProps = {
  visible: boolean;
  data?: TUser;
  dataPractice?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
