import { createReducer } from 'deox';

import { TGetOrdersResponse } from '@/services/api/order';
import { getOrdersAction } from '@/redux/actions';
import { getOrdersUpdateState } from './get-orders';

export type TOrderState = {
  getOrdersResponse?: TGetOrdersResponse;
};

const initialState: TOrderState = {
  getOrdersResponse: undefined,
};

const OrderReducer = createReducer(initialState, (handleAction) => [
  handleAction(getOrdersAction.success, getOrdersUpdateState),
]);

export default OrderReducer;
