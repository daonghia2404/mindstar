import { createReducer } from 'deox';

import {
  TCreateExpenseResponse,
  TDeleteExpenseResponse,
  TGetExpensesResponse,
  TUpdateExpenseResponse,
} from '@/services/api/expense';
import { createExpenseAction, deleteExpenseAction, getExpensesAction, updateExpenseAction } from '@/redux/actions';
import { createExpenseUpdateState } from './create-expense';
import { deleteExpenseUpdateState } from './delete-expense';
import { getExpensesUpdateState } from './get-expenses';
import { updateExpenseUpdateState } from './update-expense';

export type TExpenseState = {
  createExpenseResponse?: TCreateExpenseResponse;
  deleteExpenseResponse?: TDeleteExpenseResponse;
  getExpensesResponse?: TGetExpensesResponse;
  updateExpenseResponse?: TUpdateExpenseResponse;
};

const initialState: TExpenseState = {
  createExpenseResponse: undefined,
  deleteExpenseResponse: undefined,
  getExpensesResponse: undefined,
  updateExpenseResponse: undefined,
};

const ExpenseReducer = createReducer(initialState, (handleAction) => [
  handleAction(createExpenseAction.success, createExpenseUpdateState),
  handleAction(deleteExpenseAction.success, deleteExpenseUpdateState),
  handleAction(getExpensesAction.success, getExpensesUpdateState),
  handleAction(updateExpenseAction.success, updateExpenseUpdateState),
]);

export default ExpenseReducer;
