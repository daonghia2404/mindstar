import { TTransactionState } from '@/redux/reducers/transaction';
import { TCreateTransactionSuccess } from '@/redux/actions/transaction';

export const createTransactionUpdateState = (
  state: TTransactionState,
  action: TCreateTransactionSuccess,
): TTransactionState => ({
  ...state,
  createTransactionResponse: action.payload.response,
});
