import { createReducer } from 'deox';

import {
  TCreateOrderResponse,
  TDeleteOrderResponse,
  TGetOrderResponse,
  TGetOrdersResponse,
  TUpdateOrderResponse,
} from '@/services/api/order';
import {
  createOrderAction,
  deleteOrderAction,
  getOrderAction,
  getOrdersAction,
  updateOrderAction,
} from '@/redux/actions';
import { createOrderUpdateState } from './create-order';
import { deleteOrderUpdateState } from './delete-order';
import { getOrderUpdateState } from './get-order';
import { getOrdersUpdateState } from './get-orders';
import { updateOrderUpdateState } from './update-order';

export type TOrderState = {
  createOrderResponse?: TCreateOrderResponse;
  deleteOrderResponse?: TDeleteOrderResponse;
  getOrderResponse?: TGetOrderResponse;
  getOrdersResponse?: TGetOrdersResponse;
  updateOrderResponse?: TUpdateOrderResponse;
};

const initialState: TOrderState = {
  createOrderResponse: undefined,
  deleteOrderResponse: undefined,
  getOrderResponse: undefined,
  getOrdersResponse: undefined,
  updateOrderResponse: undefined,
};

const OrderReducer = createReducer(initialState, (handleAction) => [
  handleAction(createOrderAction.success, createOrderUpdateState),
  handleAction(deleteOrderAction.success, deleteOrderUpdateState),
  handleAction(getOrderAction.success, getOrderUpdateState),
  handleAction(getOrdersAction.success, getOrdersUpdateState),
  handleAction(updateOrderAction.success, updateOrderUpdateState),
]);

export default OrderReducer;
