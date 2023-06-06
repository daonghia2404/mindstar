import { createReducer } from 'deox';

import {
  TCreateTransactionResponse,
  TDeleteTransactionResponse,
  TGetTransactionsResponse,
  TUpdateTransactionResponse,
} from '@/services/api/transaction';
import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionsAction,
  updateTransactionAction,
} from '@/redux/actions';
import { createTransactionUpdateState } from './create-transaction';
import { deleteTransactionUpdateState } from './delete-transaction';
import { getTransactionsUpdateState } from './get-transactions';
import { updateTransactionUpdateState } from './update-transaction';

export type TTransactionState = {
  createTransactionResponse?: TCreateTransactionResponse;
  deleteTransactionResponse?: TDeleteTransactionResponse;
  getTransactionsResponse?: TGetTransactionsResponse;
  updateTransactionResponse?: TUpdateTransactionResponse;
};

const initialState: TTransactionState = {
  createTransactionResponse: undefined,
  deleteTransactionResponse: undefined,
  getTransactionsResponse: undefined,
  updateTransactionResponse: undefined,
};

const TransactionReducer = createReducer(initialState, (handleAction) => [
  handleAction(createTransactionAction.success, createTransactionUpdateState),
  handleAction(deleteTransactionAction.success, deleteTransactionUpdateState),
  handleAction(getTransactionsAction.success, getTransactionsUpdateState),
  handleAction(updateTransactionAction.success, updateTransactionUpdateState),
]);

export default TransactionReducer;
