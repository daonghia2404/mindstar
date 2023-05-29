import { TEvent } from '@/common/models';

export type TModalEventFormProps = {
  visible: boolean;
  data?: TEvent;
  onClose?: () => void;
  onSuccess?: () => void;
};
