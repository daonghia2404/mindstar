import { createActionCreator } from 'deox';

import { TGetProductMaterials, TGetProductResponse } from '@/services/api/product/get-product';

// CONSTANTS

export enum EGetProductAction {
  GET_PRODUCT = 'GET_PRODUCT',
  GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAILED = 'GET_PRODUCT_FAILED',
}

// TYPES

export type TGetProductRequest = {
  type: EGetProductAction.GET_PRODUCT_REQUEST;
  payload: {
    materials: TGetProductMaterials;
    successCallback?: (response: TGetProductResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetProductSuccess = {
  type: EGetProductAction.GET_PRODUCT_SUCCESS;
  payload: { response?: TGetProductResponse };
};

export type TGetProductFailed = { type: EGetProductAction.GET_PRODUCT_FAILED };

// FUNCTION

export const getProductAction = {
  request: createActionCreator(
    EGetProductAction.GET_PRODUCT_REQUEST,
    (resolve) =>
      (
        materials: TGetProductMaterials,
        successCallback?: (response: TGetProductResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetProductRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetProductAction.GET_PRODUCT_SUCCESS,
    (resolve) =>
      (response?: TGetProductResponse): TGetProductSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetProductAction.GET_PRODUCT_FAILED,
    (resolve) =>
      (error: unknown): TGetProductFailed =>
        resolve({ error }),
  ),
};
