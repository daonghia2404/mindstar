import { createActionCreator } from 'deox';

import { TGetMerchantFeedsMaterials, TGetMerchantFeedsResponse } from '@/services/api/merchant/get-merchant-feeds';

// CONSTANTS

export enum EGetMerchantFeedsAction {
  GET_MERCHANT_FEEDS = 'GET_MERCHANT_FEEDS',
  GET_MERCHANT_FEEDS_REQUEST = 'GET_MERCHANT_FEEDS_REQUEST',
  GET_MERCHANT_FEEDS_SUCCESS = 'GET_MERCHANT_FEEDS_SUCCESS',
  GET_MERCHANT_FEEDS_FAILED = 'GET_MERCHANT_FEEDS_FAILED',
}

// TYPES

export type TGetMerchantFeedsRequest = {
  type: EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_REQUEST;
  payload: {
    materials: TGetMerchantFeedsMaterials;
    successCallback?: (response: TGetMerchantFeedsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMerchantFeedsSuccess = {
  type: EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_SUCCESS;
  payload: { response: TGetMerchantFeedsResponse };
};

export type TGetMerchantFeedsFailed = { type: EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_FAILED };

// FUNCTION

export const getMerchantFeedsAction = {
  request: createActionCreator(
    EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_REQUEST,
    (resolve) =>
      (
        materials: TGetMerchantFeedsMaterials,
        successCallback?: (response: TGetMerchantFeedsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMerchantFeedsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_SUCCESS,
    (resolve) =>
      (response: TGetMerchantFeedsResponse): TGetMerchantFeedsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMerchantFeedsAction.GET_MERCHANT_FEEDS_FAILED,
    (resolve) =>
      (error: unknown): TGetMerchantFeedsFailed =>
        resolve({ error }),
  ),
};
