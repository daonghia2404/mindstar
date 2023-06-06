import { TTransactionState } from '@/redux/reducers/transaction';
import { TUpdateTransactionSuccess } from '@/redux/actions/transaction';

export const updateTransactionUpdateState = (
  state: TTransactionState,
  action: TUpdateTransactionSuccess,
): TTransactionState => ({
  ...state,
  updateTransactionResponse: action.payload.response,
});
