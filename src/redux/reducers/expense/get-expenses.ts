import { TExpenseState } from '@/redux/reducers/expense';
import { TGetExpensesSuccess } from '@/redux/actions/expense';

export const getExpensesUpdateState = (state: TExpenseState, action: TGetExpensesSuccess): TExpenseState => ({
  ...state,
  getExpensesResponse: action.payload.response,
});
