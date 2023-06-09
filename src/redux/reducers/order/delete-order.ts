import { TOrderState } from '@/redux/reducers/order';
import { TDeleteOrderSuccess } from '@/redux/actions/order';

export const deleteOrderUpdateState = (state: TOrderState, action: TDeleteOrderSuccess): TOrderState => ({
  ...state,
  deleteOrderResponse: action.payload.response,
});
