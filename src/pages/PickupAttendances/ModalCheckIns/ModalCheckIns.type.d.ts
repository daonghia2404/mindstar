import { TGetPickupAttendancesParams } from '@/services/api';

export type TModalCheckInsProps = {
  visible: boolean;
  getPickupAttendancesParamsRequest?: TGetPickupAttendancesParams;
  onClose?: () => void;
  onSuccess?: () => void;
};
