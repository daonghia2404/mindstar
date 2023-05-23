import { createReducer } from 'deox';

import { TGetTransactionsResponse } from '@/services/api/transaction';
import { getTransactionsAction } from '@/redux/actions';
import { getTransactionsUpdateState } from './get-transactions';

export type TTransactionState = {
  getTransactionsResponse?: TGetTransactionsResponse;
};

const initialState: TTransactionState = {
  getTransactionsResponse: undefined,
};

const TransactionReducer = createReducer(initialState, (handleAction) => [
  handleAction(getTransactionsAction.success, getTransactionsUpdateState),
]);

export default TransactionReducer;
