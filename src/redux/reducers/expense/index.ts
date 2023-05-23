import { createReducer } from 'deox';

import { TGetExpensesResponse } from '@/services/api/expense';
import { getExpensesAction } from '@/redux/actions';
import { getExpensesUpdateState } from './get-expenses';

export type TExpenseState = {
  getExpensesResponse?: TGetExpensesResponse;
};

const initialState: TExpenseState = {
  getExpensesResponse: undefined,
};

const ExpenseReducer = createReducer(initialState, (handleAction) => [
  handleAction(getExpensesAction.success, getExpensesUpdateState),
]);

export default ExpenseReducer;
