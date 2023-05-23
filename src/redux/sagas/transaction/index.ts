import { all, takeLatest } from 'redux-saga/effects';

import { getTransactionsAction } from '@/redux/actions';

import { getTransactionsSaga } from './get-transactions';

export default function* root(): Generator {
  yield all([takeLatest(getTransactionsAction.request.type, getTransactionsSaga)]);
}
