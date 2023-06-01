import { createActionCreator } from 'deox';

import { TCreateProductMaterials, TCreateProductResponse } from '@/services/api/product/create-product';

// CONSTANTS

export enum ECreateProductAction {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILED = 'CREATE_PRODUCT_FAILED',
}

// TYPES

export type TCreateProductRequest = {
  type: ECreateProductAction.CREATE_PRODUCT_REQUEST;
  payload: {
    materials: TCreateProductMaterials;
    successCallback?: (response: TCreateProductResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateProductSuccess = {
  type: ECreateProductAction.CREATE_PRODUCT_SUCCESS;
  payload: { response: TCreateProductResponse };
};

export type TCreateProductFailed = { type: ECreateProductAction.CREATE_PRODUCT_FAILED };

// FUNCTION

export const createProductAction = {
  request: createActionCreator(
    ECreateProductAction.CREATE_PRODUCT_REQUEST,
    (resolve) =>
      (
        materials: TCreateProductMaterials,
        successCallback?: (response: TCreateProductResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateProductRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateProductAction.CREATE_PRODUCT_SUCCESS,
    (resolve) =>
      (response: TCreateProductResponse): TCreateProductSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateProductAction.CREATE_PRODUCT_FAILED,
    (resolve) =>
      (error: unknown): TCreateProductFailed =>
        resolve({ error }),
  ),
};
