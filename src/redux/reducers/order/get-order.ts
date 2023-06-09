import { TOrderState } from '@/redux/reducers/order';
import { TGetOrderSuccess } from '@/redux/actions/order';

export const getOrderUpdateState = (state: TOrderState, action: TGetOrderSuccess): TOrderState => ({
  ...state,
  getOrderResponse: action.payload.response,
});
