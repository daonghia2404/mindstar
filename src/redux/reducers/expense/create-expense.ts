import { TExpenseState } from '@/redux/reducers/expense';
import { TCreateExpenseSuccess } from '@/redux/actions/expense';

export const createExpenseUpdateState = (state: TExpenseState, action: TCreateExpenseSuccess): TExpenseState => ({
  ...state,
  createExpenseResponse: action.payload.response,
});
