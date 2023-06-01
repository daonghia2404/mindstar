import { createActionCreator } from 'deox';

import { TUpdateProductMaterials, TUpdateProductResponse } from '@/services/api/product/update-product';

// CONSTANTS

export enum EUpdateProductAction {
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED',
}

// TYPES

export type TUpdateProductRequest = {
  type: EUpdateProductAction.UPDATE_PRODUCT_REQUEST;
  payload: {
    materials: TUpdateProductMaterials;
    successCallback?: (response: TUpdateProductResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateProductSuccess = {
  type: EUpdateProductAction.UPDATE_PRODUCT_SUCCESS;
  payload: { response: TUpdateProductResponse };
};

export type TUpdateProductFailed = { type: EUpdateProductAction.UPDATE_PRODUCT_FAILED };

// FUNCTION

export const updateProductAction = {
  request: createActionCreator(
    EUpdateProductAction.UPDATE_PRODUCT_REQUEST,
    (resolve) =>
      (
        materials: TUpdateProductMaterials,
        successCallback?: (response: TUpdateProductResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateProductRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateProductAction.UPDATE_PRODUCT_SUCCESS,
    (resolve) =>
      (response: TUpdateProductResponse): TUpdateProductSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateProductAction.UPDATE_PRODUCT_FAILED,
    (resolve) =>
      (error: unknown): TUpdateProductFailed =>
        resolve({ error }),
  ),
};
