import { TTransaction } from '@/common/models';

export type TModalRevenueFormProps = {
  visible: boolean;
  data?: TTransaction;
  onClose?: () => void;
  onSuccess?: () => void;
};
