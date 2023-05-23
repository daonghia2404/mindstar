import { TTransactionState } from '@/redux/reducers/transaction';
import { TGetTransactionsSuccess } from '@/redux/actions/transaction';

export const getTransactionsUpdateState = (
  state: TTransactionState,
  action: TGetTransactionsSuccess,
): TTransactionState => ({
  ...state,
  getTransactionsResponse: action.payload.response,
});
