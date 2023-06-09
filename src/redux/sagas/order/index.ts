import { all, takeLatest } from 'redux-saga/effects';

import {
  createOrderAction,
  deleteOrderAction,
  getOrderAction,
  getOrdersAction,
  updateOrderAction,
} from '@/redux/actions';

import { createOrderSaga } from './create-order';
import { deleteOrderSaga } from './delete-order';
import { getOrderSaga } from './get-order';
import { getOrdersSaga } from './get-orders';
import { updateOrderSaga } from './update-order';

export default function* root(): Generator {
  yield all([
    takeLatest(createOrderAction.request.type, createOrderSaga),
    takeLatest(deleteOrderAction.request.type, deleteOrderSaga),
    takeLatest(getOrderAction.request.type, getOrderSaga),
    takeLatest(getOrdersAction.request.type, getOrdersSaga),
    takeLatest(updateOrderAction.request.type, updateOrderSaga),
  ]);
}
