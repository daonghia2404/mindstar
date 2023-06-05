import { createActionCreator } from 'deox';

import { TGetSuppliersMaterials, TGetSuppliersResponse } from '@/services/api/supplier/get-suppliers';

// CONSTANTS

export enum EGetSuppliersAction {
  GET_SUPPLIERS = 'GET_SUPPLIERS',
  GET_SUPPLIERS_REQUEST = 'GET_SUPPLIERS_REQUEST',
  GET_SUPPLIERS_SUCCESS = 'GET_SUPPLIERS_SUCCESS',
  GET_SUPPLIERS_FAILED = 'GET_SUPPLIERS_FAILED',
}

// TYPES

export type TGetSuppliersRequest = {
  type: EGetSuppliersAction.GET_SUPPLIERS_REQUEST;
  payload: {
    materials: TGetSuppliersMaterials;
    successCallback?: (response: TGetSuppliersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetSuppliersSuccess = {
  type: EGetSuppliersAction.GET_SUPPLIERS_SUCCESS;
  payload: { response: TGetSuppliersResponse };
};

export type TGetSuppliersFailed = { type: EGetSuppliersAction.GET_SUPPLIERS_FAILED };

// FUNCTION

export const getSuppliersAction = {
  request: createActionCreator(
    EGetSuppliersAction.GET_SUPPLIERS_REQUEST,
    (resolve) =>
      (
        materials: TGetSuppliersMaterials,
        successCallback?: (response: TGetSuppliersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetSuppliersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetSuppliersAction.GET_SUPPLIERS_SUCCESS,
    (resolve) =>
      (response: TGetSuppliersResponse): TGetSuppliersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetSuppliersAction.GET_SUPPLIERS_FAILED,
    (resolve) =>
      (error: unknown): TGetSuppliersFailed =>
        resolve({ error }),
  ),
};
