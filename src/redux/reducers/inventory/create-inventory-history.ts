import { TInventoryState } from '@/redux/reducers/inventory';
import { TCreateInventoryHistorySuccess } from '@/redux/actions/inventory';

export const createInventoryHistoryUpdateState = (
  state: TInventoryState,
  action: TCreateInventoryHistorySuccess,
): TInventoryState => ({
  ...state,
  createInventoryHistoryResponse: action.payload.response,
});
