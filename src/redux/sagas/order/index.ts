import { all, takeLatest } from 'redux-saga/effects';

import { getOrdersAction } from '@/redux/actions';

import { getOrdersSaga } from './get-orders';

export default function* root(): Generator {
  yield all([takeLatest(getOrdersAction.request.type, getOrdersSaga)]);
}
