import { createActionCreator } from 'deox';

import { TDeleteTransactionMaterials, TDeleteTransactionResponse } from '@/services/api/transaction/delete-transaction';

// CONSTANTS

export enum EDeleteTransactionAction {
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',
  DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST',
  DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS',
  DELETE_TRANSACTION_FAILED = 'DELETE_TRANSACTION_FAILED',
}

// TYPES

export type TDeleteTransactionRequest = {
  type: EDeleteTransactionAction.DELETE_TRANSACTION_REQUEST;
  payload: {
    materials: TDeleteTransactionMaterials;
    successCallback?: (response: TDeleteTransactionResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteTransactionSuccess = {
  type: EDeleteTransactionAction.DELETE_TRANSACTION_SUCCESS;
  payload: { response: TDeleteTransactionResponse };
};

export type TDeleteTransactionFailed = { type: EDeleteTransactionAction.DELETE_TRANSACTION_FAILED };

// FUNCTION

export const deleteTransactionAction = {
  request: createActionCreator(
    EDeleteTransactionAction.DELETE_TRANSACTION_REQUEST,
    (resolve) =>
      (
        materials: TDeleteTransactionMaterials,
        successCallback?: (response: TDeleteTransactionResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteTransactionRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteTransactionAction.DELETE_TRANSACTION_SUCCESS,
    (resolve) =>
      (response: TDeleteTransactionResponse): TDeleteTransactionSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteTransactionAction.DELETE_TRANSACTION_FAILED,
    (resolve) =>
      (error: unknown): TDeleteTransactionFailed =>
        resolve({ error }),
  ),
};
