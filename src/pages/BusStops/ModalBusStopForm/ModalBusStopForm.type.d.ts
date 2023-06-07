import { TBusStop } from '@/common/models';

export type TModalBusStopFormProps = {
  visible: boolean;
  data?: TBusStop;
  onClose?: () => void;
  onSuccess?: () => void;
};
