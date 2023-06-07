import { TBusStop } from '@/common/models';

export type TModalDeleteBusStopProps = {
  visible: boolean;
  data?: TBusStop;
  onClose?: () => void;
  onSuccess?: () => void;
};
