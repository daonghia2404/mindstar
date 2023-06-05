import { createActionCreator } from 'deox';

import { TDeleteSupplierMaterials, TDeleteSupplierResponse } from '@/services/api/supplier/delete-supplier';

// CONSTANTS

export enum EDeleteSupplierAction {
  DELETE_SUPPLIER = 'DELETE_SUPPLIER',
  DELETE_SUPPLIER_REQUEST = 'DELETE_SUPPLIER_REQUEST',
  DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCESS',
  DELETE_SUPPLIER_FAILED = 'DELETE_SUPPLIER_FAILED',
}

// TYPES

export type TDeleteSupplierRequest = {
  type: EDeleteSupplierAction.DELETE_SUPPLIER_REQUEST;
  payload: {
    materials: TDeleteSupplierMaterials;
    successCallback?: (response: TDeleteSupplierResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteSupplierSuccess = {
  type: EDeleteSupplierAction.DELETE_SUPPLIER_SUCCESS;
  payload: { response: TDeleteSupplierResponse };
};

export type TDeleteSupplierFailed = { type: EDeleteSupplierAction.DELETE_SUPPLIER_FAILED };

// FUNCTION

export const deleteSupplierAction = {
  request: createActionCreator(
    EDeleteSupplierAction.DELETE_SUPPLIER_REQUEST,
    (resolve) =>
      (
        materials: TDeleteSupplierMaterials,
        successCallback?: (response: TDeleteSupplierResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteSupplierRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteSupplierAction.DELETE_SUPPLIER_SUCCESS,
    (resolve) =>
      (response: TDeleteSupplierResponse): TDeleteSupplierSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteSupplierAction.DELETE_SUPPLIER_FAILED,
    (resolve) =>
      (error: unknown): TDeleteSupplierFailed =>
        resolve({ error }),
  ),
};
