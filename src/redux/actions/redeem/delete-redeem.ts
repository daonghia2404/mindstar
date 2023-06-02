import { createActionCreator } from 'deox';

import { TDeleteRedeemMaterials, TDeleteRedeemResponse } from '@/services/api/redeem/delete-redeem';

// CONSTANTS

export enum EDeleteRedeemAction {
  DELETE_REDEEM = 'DELETE_REDEEM',
  DELETE_REDEEM_REQUEST = 'DELETE_REDEEM_REQUEST',
  DELETE_REDEEM_SUCCESS = 'DELETE_REDEEM_SUCCESS',
  DELETE_REDEEM_FAILED = 'DELETE_REDEEM_FAILED',
}

// TYPES

export type TDeleteRedeemRequest = {
  type: EDeleteRedeemAction.DELETE_REDEEM_REQUEST;
  payload: {
    materials: TDeleteRedeemMaterials;
    successCallback?: (response: TDeleteRedeemResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteRedeemSuccess = {
  type: EDeleteRedeemAction.DELETE_REDEEM_SUCCESS;
  payload: { response: TDeleteRedeemResponse };
};

export type TDeleteRedeemFailed = { type: EDeleteRedeemAction.DELETE_REDEEM_FAILED };

// FUNCTION

export const deleteRedeemAction = {
  request: createActionCreator(
    EDeleteRedeemAction.DELETE_REDEEM_REQUEST,
    (resolve) =>
      (
        materials: TDeleteRedeemMaterials,
        successCallback?: (response: TDeleteRedeemResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteRedeemRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteRedeemAction.DELETE_REDEEM_SUCCESS,
    (resolve) =>
      (response: TDeleteRedeemResponse): TDeleteRedeemSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteRedeemAction.DELETE_REDEEM_FAILED,
    (resolve) =>
      (error: unknown): TDeleteRedeemFailed =>
        resolve({ error }),
  ),
};
