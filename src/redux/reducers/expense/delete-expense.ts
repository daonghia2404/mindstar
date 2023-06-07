import { TExpenseState } from '@/redux/reducers/expense';
import { TDeleteExpenseSuccess } from '@/redux/actions/expense';

export const deleteExpenseUpdateState = (state: TExpenseState, action: TDeleteExpenseSuccess): TExpenseState => ({
  ...state,
  deleteExpenseResponse: action.payload.response,
});
