import { TExpense } from '@/common/models';

export type TModalExpenseFormProps = {
  visible: boolean;
  data?: TExpense;
  onClose?: () => void;
  onSuccess?: () => void;
};
