import { all, takeLatest } from 'redux-saga/effects';

import { createExpenseAction, deleteExpenseAction, getExpensesAction, updateExpenseAction } from '@/redux/actions';

import { createExpenseSaga } from './create-expense';
import { deleteExpenseSaga } from './delete-expense';
import { getExpensesSaga } from './get-expenses';
import { updateExpenseSaga } from './update-expense';

export default function* root(): Generator {
  yield all([
    takeLatest(createExpenseAction.request.type, createExpenseSaga),
    takeLatest(deleteExpenseAction.request.type, deleteExpenseSaga),
    takeLatest(getExpensesAction.request.type, getExpensesSaga),
    takeLatest(updateExpenseAction.request.type, updateExpenseSaga),
  ]);
}
