import { createActionCreator } from 'deox';

import { TGetMerchantsMaterials, TGetMerchantsResponse } from '@/services/api/merchant/get-merchants';

// CONSTANTS

export enum EGetMerchantsAction {
  GET_MERCHANTS = 'GET_MERCHANTS',
  GET_MERCHANTS_REQUEST = 'GET_MERCHANTS_REQUEST',
  GET_MERCHANTS_SUCCESS = 'GET_MERCHANTS_SUCCESS',
  GET_MERCHANTS_FAILED = 'GET_MERCHANTS_FAILED',
}

// TYPES

export type TGetMerchantsRequest = {
  type: EGetMerchantsAction.GET_MERCHANTS_REQUEST;
  payload: {
    materials: TGetMerchantsMaterials;
    successCallback?: (response: TGetMerchantsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMerchantsSuccess = {
  type: EGetMerchantsAction.GET_MERCHANTS_SUCCESS;
  payload: { response: TGetMerchantsResponse };
};

export type TGetMerchantsFailed = { type: EGetMerchantsAction.GET_MERCHANTS_FAILED };

// FUNCTION

export const getMerchantsAction = {
  request: createActionCreator(
    EGetMerchantsAction.GET_MERCHANTS_REQUEST,
    (resolve) =>
      (
        materials: TGetMerchantsMaterials,
        successCallback?: (response: TGetMerchantsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMerchantsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMerchantsAction.GET_MERCHANTS_SUCCESS,
    (resolve) =>
      (response: TGetMerchantsResponse): TGetMerchantsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMerchantsAction.GET_MERCHANTS_FAILED,
    (resolve) =>
      (error: unknown): TGetMerchantsFailed =>
        resolve({ error }),
  ),
};
