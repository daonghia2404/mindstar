import { TTransactionState } from '@/redux/reducers/transaction';
import { TDeleteTransactionSuccess } from '@/redux/actions/transaction';

export const deleteTransactionUpdateState = (
  state: TTransactionState,
  action: TDeleteTransactionSuccess,
): TTransactionState => ({
  ...state,
  deleteTransactionResponse: action.payload.response,
});
