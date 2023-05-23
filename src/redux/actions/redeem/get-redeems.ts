import { createActionCreator } from 'deox';

import { TGetRedeemsMaterials, TGetRedeemsResponse } from '@/services/api/redeem/get-redeems';

// CONSTANTS

export enum EGetRedeemsAction {
  GET_REDEEMS = 'GET_REDEEMS',
  GET_REDEEMS_REQUEST = 'GET_REDEEMS_REQUEST',
  GET_REDEEMS_SUCCESS = 'GET_REDEEMS_SUCCESS',
  GET_REDEEMS_FAILED = 'GET_REDEEMS_FAILED',
}

// TYPES

export type TGetRedeemsRequest = {
  type: EGetRedeemsAction.GET_REDEEMS_REQUEST;
  payload: {
    materials: TGetRedeemsMaterials;
    successCallback?: (response: TGetRedeemsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetRedeemsSuccess = {
  type: EGetRedeemsAction.GET_REDEEMS_SUCCESS;
  payload: { response: TGetRedeemsResponse };
};

export type TGetRedeemsFailed = { type: EGetRedeemsAction.GET_REDEEMS_FAILED };

// FUNCTION

export const getRedeemsAction = {
  request: createActionCreator(
    EGetRedeemsAction.GET_REDEEMS_REQUEST,
    (resolve) =>
      (
        materials: TGetRedeemsMaterials,
        successCallback?: (response: TGetRedeemsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetRedeemsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetRedeemsAction.GET_REDEEMS_SUCCESS,
    (resolve) =>
      (response: TGetRedeemsResponse): TGetRedeemsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetRedeemsAction.GET_REDEEMS_FAILED,
    (resolve) =>
      (error: unknown): TGetRedeemsFailed =>
        resolve({ error }),
  ),
};
