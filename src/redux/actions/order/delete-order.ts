import { createActionCreator } from 'deox';

import { TDeleteOrderMaterials, TDeleteOrderResponse } from '@/services/api/order/delete-order';

// CONSTANTS

export enum EDeleteOrderAction {
  DELETE_ORDER = 'DELETE_ORDER',
  DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST',
  DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILED = 'DELETE_ORDER_FAILED',
}

// TYPES

export type TDeleteOrderRequest = {
  type: EDeleteOrderAction.DELETE_ORDER_REQUEST;
  payload: {
    materials: TDeleteOrderMaterials;
    successCallback?: (response: TDeleteOrderResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteOrderSuccess = {
  type: EDeleteOrderAction.DELETE_ORDER_SUCCESS;
  payload: { response: TDeleteOrderResponse };
};

export type TDeleteOrderFailed = { type: EDeleteOrderAction.DELETE_ORDER_FAILED };

// FUNCTION

export const deleteOrderAction = {
  request: createActionCreator(
    EDeleteOrderAction.DELETE_ORDER_REQUEST,
    (resolve) =>
      (
        materials: TDeleteOrderMaterials,
        successCallback?: (response: TDeleteOrderResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteOrderRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteOrderAction.DELETE_ORDER_SUCCESS,
    (resolve) =>
      (response: TDeleteOrderResponse): TDeleteOrderSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteOrderAction.DELETE_ORDER_FAILED,
    (resolve) =>
      (error: unknown): TDeleteOrderFailed =>
        resolve({ error }),
  ),
};
