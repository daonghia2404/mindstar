import { TUser } from '@/common/models';

export type TModalPlayerFormProps = {
  visible: boolean;
  data?: TUser;
  dataPractice?: TUser;
  isRecover?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};
