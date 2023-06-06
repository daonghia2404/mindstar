import { all, takeLatest } from 'redux-saga/effects';

import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionsAction,
  updateTransactionAction,
} from '@/redux/actions';

import { createTransactionSaga } from './create-transaction';
import { deleteTransactionSaga } from './delete-transaction';
import { getTransactionsSaga } from './get-transactions';
import { updateTransactionSaga } from './update-transaction';

export default function* root(): Generator {
  yield all([
    takeLatest(createTransactionAction.request.type, createTransactionSaga),
    takeLatest(deleteTransactionAction.request.type, deleteTransactionSaga),
    takeLatest(getTransactionsAction.request.type, getTransactionsSaga),
    takeLatest(updateTransactionAction.request.type, updateTransactionSaga),
  ]);
}
