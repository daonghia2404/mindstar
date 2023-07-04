import { TTimeOff } from '@/common/models';

export type TModalActionTimeOffProps = {
  visible: boolean;
  data?: TTimeOff;
  onClose?: () => void;
  onSuccess?: () => void;
};
