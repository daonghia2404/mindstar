import { TClass } from '@/common/models';

export type TModalClassFormProps = {
  visible: boolean;
  data?: TClass;
  onClose?: () => void;
  onSuccess?: () => void;
};
