import { createActionCreator } from 'deox';

import { TUpdateOrderMaterials, TUpdateOrderResponse } from '@/services/api/order/update-order';

// CONSTANTS

export enum EUpdateOrderAction {
  UPDATE_ORDER = 'UPDATE_ORDER',
  UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST',
  UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILED = 'UPDATE_ORDER_FAILED',
}

// TYPES

export type TUpdateOrderRequest = {
  type: EUpdateOrderAction.UPDATE_ORDER_REQUEST;
  payload: {
    materials: TUpdateOrderMaterials;
    successCallback?: (response: TUpdateOrderResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateOrderSuccess = {
  type: EUpdateOrderAction.UPDATE_ORDER_SUCCESS;
  payload: { response: TUpdateOrderResponse };
};

export type TUpdateOrderFailed = { type: EUpdateOrderAction.UPDATE_ORDER_FAILED };

// FUNCTION

export const updateOrderAction = {
  request: createActionCreator(
    EUpdateOrderAction.UPDATE_ORDER_REQUEST,
    (resolve) =>
      (
        materials: TUpdateOrderMaterials,
        successCallback?: (response: TUpdateOrderResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateOrderRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateOrderAction.UPDATE_ORDER_SUCCESS,
    (resolve) =>
      (response: TUpdateOrderResponse): TUpdateOrderSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateOrderAction.UPDATE_ORDER_FAILED,
    (resolve) =>
      (error: unknown): TUpdateOrderFailed =>
        resolve({ error }),
  ),
};
