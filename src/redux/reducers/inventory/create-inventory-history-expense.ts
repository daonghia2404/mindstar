import { TInventoryState } from '@/redux/reducers/inventory';
import { TCreateInventoryHistoryExpenseSuccess } from '@/redux/actions/inventory';

export const createInventoryHistoryExpenseUpdateState = (
  state: TInventoryState,
  action: TCreateInventoryHistoryExpenseSuccess,
): TInventoryState => ({
  ...state,
  createInventoryHistoryExpenseResponse: action.payload.response,
});
