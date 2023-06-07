import { TBusStop, TBusStopPlayer } from '@/common/models';

export type TModalDeleteBusStopPlayerProps = {
  visible: boolean;
  data?: TBusStopPlayer;
  dataBusStop?: TBusStop;
  onClose?: () => void;
  onSuccess?: () => void;
};
