import { TExpense } from '@/common/models';

export type TModalDeleteExpenseProps = {
  visible: boolean;
  data?: TExpense;
  onClose?: () => void;
  onSuccess?: () => void;
};
