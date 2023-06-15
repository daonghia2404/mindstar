import { TGetPickupAttendancesParams } from '@/services/api';

export type TModalCheckInsProps = {
  visible: boolean;
  getPickupAttendancesParamsRequest?: TGetPickupAttendancesParams;
  isValidTransportMode?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};
