import { TInventoryState } from '@/redux/reducers/inventory';
import { TGetInventoryHistoriesSuccess } from '@/redux/actions/inventory';

export const getInventoryHistoriesUpdateState = (
  state: TInventoryState,
  action: TGetInventoryHistoriesSuccess,
): TInventoryState => ({
  ...state,
  getInventoryHistoriesResponse: action.payload.response,
});
