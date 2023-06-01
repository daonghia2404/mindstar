import { createActionCreator } from 'deox';

import { TGetProductsMaterials, TGetProductsResponse } from '@/services/api/product/get-products';

// CONSTANTS

export enum EGetProductsAction {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED',
}

// TYPES

export type TGetProductsRequest = {
  type: EGetProductsAction.GET_PRODUCTS_REQUEST;
  payload: {
    materials: TGetProductsMaterials;
    successCallback?: (response: TGetProductsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetProductsSuccess = {
  type: EGetProductsAction.GET_PRODUCTS_SUCCESS;
  payload: { response: TGetProductsResponse };
};

export type TGetProductsFailed = { type: EGetProductsAction.GET_PRODUCTS_FAILED };

// FUNCTION

export const getProductsAction = {
  request: createActionCreator(
    EGetProductsAction.GET_PRODUCTS_REQUEST,
    (resolve) =>
      (
        materials: TGetProductsMaterials,
        successCallback?: (response: TGetProductsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetProductsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetProductsAction.GET_PRODUCTS_SUCCESS,
    (resolve) =>
      (response: TGetProductsResponse): TGetProductsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetProductsAction.GET_PRODUCTS_FAILED,
    (resolve) =>
      (error: unknown): TGetProductsFailed =>
        resolve({ error }),
  ),
};
