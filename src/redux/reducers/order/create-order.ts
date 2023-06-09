import { TOrderState } from '@/redux/reducers/order';
import { TCreateOrderSuccess } from '@/redux/actions/order';

export const createOrderUpdateState = (state: TOrderState, action: TCreateOrderSuccess): TOrderState => ({
  ...state,
  createOrderResponse: action.payload.response,
});
