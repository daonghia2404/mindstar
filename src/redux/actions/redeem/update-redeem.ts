import { createActionCreator } from 'deox';

import { TUpdateRedeemMaterials, TUpdateRedeemResponse } from '@/services/api/redeem/update-redeem';

// CONSTANTS

export enum EUpdateRedeemAction {
  UPDATE_REDEEM = 'UPDATE_REDEEM',
  UPDATE_REDEEM_REQUEST = 'UPDATE_REDEEM_REQUEST',
  UPDATE_REDEEM_SUCCESS = 'UPDATE_REDEEM_SUCCESS',
  UPDATE_REDEEM_FAILED = 'UPDATE_REDEEM_FAILED',
}

// TYPES

export type TUpdateRedeemRequest = {
  type: EUpdateRedeemAction.UPDATE_REDEEM_REQUEST;
  payload: {
    materials: TUpdateRedeemMaterials;
    successCallback?: (response: TUpdateRedeemResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateRedeemSuccess = {
  type: EUpdateRedeemAction.UPDATE_REDEEM_SUCCESS;
  payload: { response: TUpdateRedeemResponse };
};

export type TUpdateRedeemFailed = { type: EUpdateRedeemAction.UPDATE_REDEEM_FAILED };

// FUNCTION

export const updateRedeemAction = {
  request: createActionCreator(
    EUpdateRedeemAction.UPDATE_REDEEM_REQUEST,
    (resolve) =>
      (
        materials: TUpdateRedeemMaterials,
        successCallback?: (response: TUpdateRedeemResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateRedeemRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateRedeemAction.UPDATE_REDEEM_SUCCESS,
    (resolve) =>
      (response: TUpdateRedeemResponse): TUpdateRedeemSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateRedeemAction.UPDATE_REDEEM_FAILED,
    (resolve) =>
      (error: unknown): TUpdateRedeemFailed =>
        resolve({ error }),
  ),
};
