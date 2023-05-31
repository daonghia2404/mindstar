import { TUser } from '@/common/models';

export type TModalPracticeFormProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
