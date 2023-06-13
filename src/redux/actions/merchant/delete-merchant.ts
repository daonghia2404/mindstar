import { createActionCreator } from 'deox';

import { TDeleteMerchantMaterials, TDeleteMerchantResponse } from '@/services/api/merchant/delete-merchant';

// CONSTANTS

export enum EDeleteMerchantAction {
  DELETE_MERCHANT = 'DELETE_MERCHANT',
  DELETE_MERCHANT_REQUEST = 'DELETE_MERCHANT_REQUEST',
  DELETE_MERCHANT_SUCCESS = 'DELETE_MERCHANT_SUCCESS',
  DELETE_MERCHANT_FAILED = 'DELETE_MERCHANT_FAILED',
}

// TYPES

export type TDeleteMerchantRequest = {
  type: EDeleteMerchantAction.DELETE_MERCHANT_REQUEST;
  payload: {
    materials: TDeleteMerchantMaterials;
    successCallback?: (response: TDeleteMerchantResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteMerchantSuccess = {
  type: EDeleteMerchantAction.DELETE_MERCHANT_SUCCESS;
  payload: { response: TDeleteMerchantResponse };
};

export type TDeleteMerchantFailed = { type: EDeleteMerchantAction.DELETE_MERCHANT_FAILED };

// FUNCTION

export const deleteMerchantAction = {
  request: createActionCreator(
    EDeleteMerchantAction.DELETE_MERCHANT_REQUEST,
    (resolve) =>
      (
        materials: TDeleteMerchantMaterials,
        successCallback?: (response: TDeleteMerchantResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteMerchantRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteMerchantAction.DELETE_MERCHANT_SUCCESS,
    (resolve) =>
      (response: TDeleteMerchantResponse): TDeleteMerchantSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteMerchantAction.DELETE_MERCHANT_FAILED,
    (resolve) =>
      (error: unknown): TDeleteMerchantFailed =>
        resolve({ error }),
  ),
};
