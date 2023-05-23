import { all, takeLatest } from 'redux-saga/effects';

import { getExpensesAction } from '@/redux/actions';

import { getExpensesSaga } from './get-expenses';

export default function* root(): Generator {
  yield all([takeLatest(getExpensesAction.request.type, getExpensesSaga)]);
}
