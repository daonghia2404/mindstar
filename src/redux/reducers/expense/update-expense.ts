import { TExpenseState } from '@/redux/reducers/expense';
import { TUpdateExpenseSuccess } from '@/redux/actions/expense';

export const updateExpenseUpdateState = (state: TExpenseState, action: TUpdateExpenseSuccess): TExpenseState => ({
  ...state,
  updateExpenseResponse: action.payload.response,
});
