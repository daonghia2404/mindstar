import { createActionCreator } from 'deox';

import { TCreateTransactionMaterials, TCreateTransactionResponse } from '@/services/api/transaction/create-transaction';

// CONSTANTS

export enum ECreateTransactionAction {
  CREATE_TRANSACTION = 'CREATE_TRANSACTION',
  CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST',
  CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS',
  CREATE_TRANSACTION_FAILED = 'CREATE_TRANSACTION_FAILED',
}

// TYPES

export type TCreateTransactionRequest = {
  type: ECreateTransactionAction.CREATE_TRANSACTION_REQUEST;
  payload: {
    materials: TCreateTransactionMaterials;
    successCallback?: (response: TCreateTransactionResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateTransactionSuccess = {
  type: ECreateTransactionAction.CREATE_TRANSACTION_SUCCESS;
  payload: { response: TCreateTransactionResponse };
};

export type TCreateTransactionFailed = { type: ECreateTransactionAction.CREATE_TRANSACTION_FAILED };

// FUNCTION

export const createTransactionAction = {
  request: createActionCreator(
    ECreateTransactionAction.CREATE_TRANSACTION_REQUEST,
    (resolve) =>
      (
        materials: TCreateTransactionMaterials,
        successCallback?: (response: TCreateTransactionResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateTransactionRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateTransactionAction.CREATE_TRANSACTION_SUCCESS,
    (resolve) =>
      (response: TCreateTransactionResponse): TCreateTransactionSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateTransactionAction.CREATE_TRANSACTION_FAILED,
    (resolve) =>
      (error: unknown): TCreateTransactionFailed =>
        resolve({ error }),
  ),
};
