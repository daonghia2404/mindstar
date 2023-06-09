import { TOrder } from '@/common/models';

export type TModalDeleteOrderProps = {
  visible: boolean;
  data?: TOrder;
  onClose?: () => void;
  onSuccess?: () => void;
};
