import { TGetAttendancesParams } from '@/services/api';

export type TModalCheckInsProps = {
  visible: boolean;
  getAttendancesParamsRequest?: TGetAttendancesParams;
  onClose?: () => void;
  onSuccess?: () => void;
};
