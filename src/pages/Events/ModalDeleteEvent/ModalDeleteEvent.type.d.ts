import { TEvent } from '@/common/models';

export type TModalDeleteEventProps = {
  visible: boolean;
  data?: TEvent;
  onClose?: () => void;
  onSuccess?: () => void;
};
