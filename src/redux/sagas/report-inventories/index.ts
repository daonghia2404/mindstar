import { all, takeLatest } from 'redux-saga/effects';

import { getInventorysAction } from '@/redux/actions';

import { getInventorysSaga } from './get-inventorys';

export default function* root(): Generator {
  yield all([takeLatest(getInventorysAction.request.type, getInventorysSaga)]);
}
