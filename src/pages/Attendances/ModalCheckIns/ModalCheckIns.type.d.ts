import { TGetAttendancesParams } from '@/services/api';

export type TModalCheckInsProps = {
  visible: boolean;
  managers?: boolean;
  getAttendancesParamsRequest?: TGetAttendancesParams;
  onClose?: () => void;
  onSuccess?: () => void;
};
