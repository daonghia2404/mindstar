import { all, takeLatest } from 'redux-saga/effects';

import {
  createInventoryHistoryExpenseAction,
  createInventoryHistoryAction,
  deleteInventoryHistoryAction,
  getInventoryHistoriesAction,
  updateInventoryHistoryAction,
} from '@/redux/actions';

import { createInventoryHistoryExpenseSaga } from './create-inventory-history-expense';
import { createInventoryHistorySaga } from './create-inventory-history';
import { deleteInventoryHistorySaga } from './delete-inventory-history';
import { getInventoryHistoriesSaga } from './get-inventory-histories';
import { updateInventoryHistorySaga } from './update-inventory-history';

export default function* root(): Generator {
  yield all([
    takeLatest(createInventoryHistoryExpenseAction.request.type, createInventoryHistoryExpenseSaga),
    takeLatest(createInventoryHistoryAction.request.type, createInventoryHistorySaga),
    takeLatest(deleteInventoryHistoryAction.request.type, deleteInventoryHistorySaga),
    takeLatest(getInventoryHistoriesAction.request.type, getInventoryHistoriesSaga),
    takeLatest(updateInventoryHistoryAction.request.type, updateInventoryHistorySaga),
  ]);
}
