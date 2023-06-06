import { TTransaction } from '@/common/models';

export type TModalDeleteRevenueProps = {
  visible: boolean;
  data?: TTransaction;
  onClose?: () => void;
  onSuccess?: () => void;
};
