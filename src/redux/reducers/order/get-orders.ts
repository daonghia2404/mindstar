import { TOrderState } from '@/redux/reducers/order';
import { TGetOrdersSuccess } from '@/redux/actions/order';

export const getOrdersUpdateState = (state: TOrderState, action: TGetOrdersSuccess): TOrderState => ({
  ...state,
  getOrdersResponse: action.payload.response,
});
