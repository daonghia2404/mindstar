import { TBusStop, TBusStopPlayer } from '@/common/models';

export type TModalBusStopPlayerFormProps = {
  visible: boolean;
  data?: TBusStopPlayer;
  dataBusStop?: TBusStop;
  onClose?: () => void;
  onSuccess?: () => void;
};
