import { TGetPickupAttendancesParams } from '@/services/api';

export type TModalCheckInsProps = {
  visible: boolean;
  getPickupAttendancesParamsRequest?: TGetPickupAttendancesParams;
  isValidTransportMode?: boolean;
  direction?: number;
  onClose?: () => void;
  onSuccess?: () => void;
};
