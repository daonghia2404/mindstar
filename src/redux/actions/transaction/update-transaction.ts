import { createActionCreator } from 'deox';

import { TUpdateTransactionMaterials, TUpdateTransactionResponse } from '@/services/api/transaction/update-transaction';

// CONSTANTS

export enum EUpdateTransactionAction {
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
  UPDATE_TRANSACTION_REQUEST = 'UPDATE_TRANSACTION_REQUEST',
  UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS',
  UPDATE_TRANSACTION_FAILED = 'UPDATE_TRANSACTION_FAILED',
}

// TYPES

export type TUpdateTransactionRequest = {
  type: EUpdateTransactionAction.UPDATE_TRANSACTION_REQUEST;
  payload: {
    materials: TUpdateTransactionMaterials;
    successCallback?: (response: TUpdateTransactionResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateTransactionSuccess = {
  type: EUpdateTransactionAction.UPDATE_TRANSACTION_SUCCESS;
  payload: { response: TUpdateTransactionResponse };
};

export type TUpdateTransactionFailed = { type: EUpdateTransactionAction.UPDATE_TRANSACTION_FAILED };

// FUNCTION

export const updateTransactionAction = {
  request: createActionCreator(
    EUpdateTransactionAction.UPDATE_TRANSACTION_REQUEST,
    (resolve) =>
      (
        materials: TUpdateTransactionMaterials,
        successCallback?: (response: TUpdateTransactionResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateTransactionRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateTransactionAction.UPDATE_TRANSACTION_SUCCESS,
    (resolve) =>
      (response: TUpdateTransactionResponse): TUpdateTransactionSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateTransactionAction.UPDATE_TRANSACTION_FAILED,
    (resolve) =>
      (error: unknown): TUpdateTransactionFailed =>
        resolve({ error }),
  ),
};
