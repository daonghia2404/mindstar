import { TExpense, TInventoryHistory } from '@/common/models';

export type TModalExpenseFormProps = {
  visible: boolean;
  data?: TExpense;
  dataInventoryHistory?: TInventoryHistory;
  onClose?: () => void;
  onSuccess?: () => void;
};
