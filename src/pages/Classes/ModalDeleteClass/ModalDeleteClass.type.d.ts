import { TClass } from '@/common/models';

export type TModalDeleteClassProps = {
  visible: boolean;
  data?: TClass;
  onClose?: () => void;
  onSuccess?: () => void;
};
