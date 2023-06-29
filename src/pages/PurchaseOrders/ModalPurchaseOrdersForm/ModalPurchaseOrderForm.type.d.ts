import { TInventoryHistory } from '@/common/models';

export type TModalPurchaseOrderFormProps = {
  visible: boolean;
  data?: TInventoryHistory;
  onClose?: () => void;
  onSuccess?: () => void;
};
