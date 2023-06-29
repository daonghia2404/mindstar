import { TInventoryState } from '@/redux/reducers/inventory';
import { TUpdateInventoryHistorySuccess } from '@/redux/actions/inventory';

export const updateInventoryHistoryUpdateState = (
  state: TInventoryState,
  action: TUpdateInventoryHistorySuccess,
): TInventoryState => ({
  ...state,
  updateInventoryHistoryResponse: action.payload.response,
});
