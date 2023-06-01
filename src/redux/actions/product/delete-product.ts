import { createActionCreator } from 'deox';

import { TDeleteProductMaterials, TDeleteProductResponse } from '@/services/api/product/delete-product';

// CONSTANTS

export enum EDeleteProductAction {
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED',
}

// TYPES

export type TDeleteProductRequest = {
  type: EDeleteProductAction.DELETE_PRODUCT_REQUEST;
  payload: {
    materials: TDeleteProductMaterials;
    successCallback?: (response: TDeleteProductResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteProductSuccess = {
  type: EDeleteProductAction.DELETE_PRODUCT_SUCCESS;
  payload: { response: TDeleteProductResponse };
};

export type TDeleteProductFailed = { type: EDeleteProductAction.DELETE_PRODUCT_FAILED };

// FUNCTION

export const deleteProductAction = {
  request: createActionCreator(
    EDeleteProductAction.DELETE_PRODUCT_REQUEST,
    (resolve) =>
      (
        materials: TDeleteProductMaterials,
        successCallback?: (response: TDeleteProductResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteProductRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteProductAction.DELETE_PRODUCT_SUCCESS,
    (resolve) =>
      (response: TDeleteProductResponse): TDeleteProductSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteProductAction.DELETE_PRODUCT_FAILED,
    (resolve) =>
      (error: unknown): TDeleteProductFailed =>
        resolve({ error }),
  ),
};
