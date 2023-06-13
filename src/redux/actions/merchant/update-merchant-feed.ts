import { createActionCreator } from 'deox';

import {
  TUpdateMerchantFeedMaterials,
  TUpdateMerchantFeedResponse,
} from '@/services/api/merchant/update-merchant-feed';

// CONSTANTS

export enum EUpdateMerchantFeedAction {
  UPDATE_MERCHANT_FEED = 'UPDATE_MERCHANT_FEED',
  UPDATE_MERCHANT_FEED_REQUEST = 'UPDATE_MERCHANT_FEED_REQUEST',
  UPDATE_MERCHANT_FEED_SUCCESS = 'UPDATE_MERCHANT_FEED_SUCCESS',
  UPDATE_MERCHANT_FEED_FAILED = 'UPDATE_MERCHANT_FEED_FAILED',
}

// TYPES

export type TUpdateMerchantFeedRequest = {
  type: EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_REQUEST;
  payload: {
    materials: TUpdateMerchantFeedMaterials;
    successCallback?: (response: TUpdateMerchantFeedResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateMerchantFeedSuccess = {
  type: EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_SUCCESS;
  payload: { response: TUpdateMerchantFeedResponse };
};

export type TUpdateMerchantFeedFailed = { type: EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_FAILED };

// FUNCTION

export const updateMerchantFeedAction = {
  request: createActionCreator(
    EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_REQUEST,
    (resolve) =>
      (
        materials: TUpdateMerchantFeedMaterials,
        successCallback?: (response: TUpdateMerchantFeedResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateMerchantFeedRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_SUCCESS,
    (resolve) =>
      (response: TUpdateMerchantFeedResponse): TUpdateMerchantFeedSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateMerchantFeedAction.UPDATE_MERCHANT_FEED_FAILED,
    (resolve) =>
      (error: unknown): TUpdateMerchantFeedFailed =>
        resolve({ error }),
  ),
};
