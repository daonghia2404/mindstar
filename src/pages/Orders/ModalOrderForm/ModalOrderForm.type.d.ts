import { TOrder } from '@/common/models';

export type TModalOrderFormProps = {
  visible: boolean;
  data?: TOrder;
  onClose?: () => void;
  onSuccess?: () => void;
};
