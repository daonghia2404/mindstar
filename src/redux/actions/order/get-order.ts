import { createActionCreator } from 'deox';

import { TGetOrderMaterials, TGetOrderResponse } from '@/services/api/order/get-order';

// CONSTANTS

export enum EGetOrderAction {
  GET_ORDER = 'GET_ORDER',
  GET_ORDER_REQUEST = 'GET_ORDER_REQUEST',
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_FAILED = 'GET_ORDER_FAILED',
}

// TYPES

export type TGetOrderRequest = {
  type: EGetOrderAction.GET_ORDER_REQUEST;
  payload: {
    materials: TGetOrderMaterials;
    successCallback?: (response: TGetOrderResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetOrderSuccess = {
  type: EGetOrderAction.GET_ORDER_SUCCESS;
  payload: { response: TGetOrderResponse };
};

export type TGetOrderFailed = { type: EGetOrderAction.GET_ORDER_FAILED };

// FUNCTION

export const getOrderAction = {
  request: createActionCreator(
    EGetOrderAction.GET_ORDER_REQUEST,
    (resolve) =>
      (
        materials: TGetOrderMaterials,
        successCallback?: (response: TGetOrderResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetOrderRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetOrderAction.GET_ORDER_SUCCESS,
    (resolve) =>
      (response: TGetOrderResponse): TGetOrderSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetOrderAction.GET_ORDER_FAILED,
    (resolve) =>
      (error: unknown): TGetOrderFailed =>
        resolve({ error }),
  ),
};
