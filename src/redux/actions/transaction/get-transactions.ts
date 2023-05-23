import { createActionCreator } from 'deox';

import { TGetTransactionsMaterials, TGetTransactionsResponse } from '@/services/api/transaction/get-transactions';

// CONSTANTS

export enum EGetTransactionsAction {
  GET_TRANSACTIONS = 'GET_TRANSACTIONS',
  GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST',
  GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILED = 'GET_TRANSACTIONS_FAILED',
}

// TYPES

export type TGetTransactionsRequest = {
  type: EGetTransactionsAction.GET_TRANSACTIONS_REQUEST;
  payload: {
    materials: TGetTransactionsMaterials;
    successCallback?: (response: TGetTransactionsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetTransactionsSuccess = {
  type: EGetTransactionsAction.GET_TRANSACTIONS_SUCCESS;
  payload: { response: TGetTransactionsResponse };
};

export type TGetTransactionsFailed = { type: EGetTransactionsAction.GET_TRANSACTIONS_FAILED };

// FUNCTION

export const getTransactionsAction = {
  request: createActionCreator(
    EGetTransactionsAction.GET_TRANSACTIONS_REQUEST,
    (resolve) =>
      (
        materials: TGetTransactionsMaterials,
        successCallback?: (response: TGetTransactionsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetTransactionsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetTransactionsAction.GET_TRANSACTIONS_SUCCESS,
    (resolve) =>
      (response: TGetTransactionsResponse): TGetTransactionsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetTransactionsAction.GET_TRANSACTIONS_FAILED,
    (resolve) =>
      (error: unknown): TGetTransactionsFailed =>
        resolve({ error }),
  ),
};
