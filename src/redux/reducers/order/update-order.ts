import { TOrderState } from '@/redux/reducers/order';
import { TUpdateOrderSuccess } from '@/redux/actions/order';

export const updateOrderUpdateState = (state: TOrderState, action: TUpdateOrderSuccess): TOrderState => ({
  ...state,
  updateOrderResponse: action.payload.response,
});
