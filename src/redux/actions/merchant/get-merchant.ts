import { createActionCreator } from 'deox';

import { TGetMerchantMaterials, TGetMerchantResponse } from '@/services/api/merchant/get-merchant';

// CONSTANTS

export enum EGetMerchantAction {
  GET_MERCHANT = 'GET_MERCHANT',
  GET_MERCHANT_REQUEST = 'GET_MERCHANT_REQUEST',
  GET_MERCHANT_SUCCESS = 'GET_MERCHANT_SUCCESS',
  GET_MERCHANT_FAILED = 'GET_MERCHANT_FAILED',
}

// TYPES

export type TGetMerchantRequest = {
  type: EGetMerchantAction.GET_MERCHANT_REQUEST;
  payload: {
    materials: TGetMerchantMaterials;
    successCallback?: (response: TGetMerchantResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMerchantSuccess = {
  type: EGetMerchantAction.GET_MERCHANT_SUCCESS;
  payload: { response: TGetMerchantResponse };
};

export type TGetMerchantFailed = { type: EGetMerchantAction.GET_MERCHANT_FAILED };

// FUNCTION

export const getMerchantAction = {
  request: createActionCreator(
    EGetMerchantAction.GET_MERCHANT_REQUEST,
    (resolve) =>
      (
        materials: TGetMerchantMaterials,
        successCallback?: (response: TGetMerchantResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMerchantRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMerchantAction.GET_MERCHANT_SUCCESS,
    (resolve) =>
      (response: TGetMerchantResponse): TGetMerchantSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMerchantAction.GET_MERCHANT_FAILED,
    (resolve) =>
      (error: unknown): TGetMerchantFailed =>
        resolve({ error }),
  ),
};
