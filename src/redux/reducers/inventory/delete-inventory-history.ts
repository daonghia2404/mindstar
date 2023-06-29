import { TInventoryState } from '@/redux/reducers/inventory';
import { TDeleteInventoryHistorySuccess } from '@/redux/actions/inventory';

export const deleteInventoryHistoryUpdateState = (
  state: TInventoryState,
  action: TDeleteInventoryHistorySuccess,
): TInventoryState => ({
  ...state,
  deleteInventoryHistoryResponse: action.payload.response,
});
