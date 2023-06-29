import { TInventoryHistory } from '@/common/models';

export type TModalDeletePurchaseOrderProps = {
  visible: boolean;
  data?: TInventoryHistory;
  onClose?: () => void;
  onSuccess?: () => void;
};
