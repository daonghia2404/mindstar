import { createActionCreator } from 'deox';

import { TCreateOrderMaterials, TCreateOrderResponse } from '@/services/api/order/create-order';

// CONSTANTS

export enum ECreateOrderAction {
  CREATE_ORDER = 'CREATE_ORDER',
  CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED',
}

// TYPES

export type TCreateOrderRequest = {
  type: ECreateOrderAction.CREATE_ORDER_REQUEST;
  payload: {
    materials: TCreateOrderMaterials;
    successCallback?: (response: TCreateOrderResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateOrderSuccess = {
  type: ECreateOrderAction.CREATE_ORDER_SUCCESS;
  payload: { response: TCreateOrderResponse };
};

export type TCreateOrderFailed = { type: ECreateOrderAction.CREATE_ORDER_FAILED };

// FUNCTION

export const createOrderAction = {
  request: createActionCreator(
    ECreateOrderAction.CREATE_ORDER_REQUEST,
    (resolve) =>
      (
        materials: TCreateOrderMaterials,
        successCallback?: (response: TCreateOrderResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateOrderRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateOrderAction.CREATE_ORDER_SUCCESS,
    (resolve) =>
      (response: TCreateOrderResponse): TCreateOrderSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateOrderAction.CREATE_ORDER_FAILED,
    (resolve) =>
      (error: unknown): TCreateOrderFailed =>
        resolve({ error }),
  ),
};
