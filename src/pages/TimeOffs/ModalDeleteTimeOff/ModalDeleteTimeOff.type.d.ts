import { TTimeOff } from '@/common/models';

export type TModalDeleteTimeOffProps = {
  visible: boolean;
  data?: TTimeOff;
  onClose?: () => void;
  onSuccess?: () => void;
};
