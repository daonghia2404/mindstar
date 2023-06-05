import { createActionCreator } from 'deox';

import { TUpdateSupplierMaterials, TUpdateSupplierResponse } from '@/services/api/supplier/update-supplier';

// CONSTANTS

export enum EUpdateSupplierAction {
  UPDATE_SUPPLIER = 'UPDATE_SUPPLIER',
  UPDATE_SUPPLIER_REQUEST = 'UPDATE_SUPPLIER_REQUEST',
  UPDATE_SUPPLIER_SUCCESS = 'UPDATE_SUPPLIER_SUCCESS',
  UPDATE_SUPPLIER_FAILED = 'UPDATE_SUPPLIER_FAILED',
}

// TYPES

export type TUpdateSupplierRequest = {
  type: EUpdateSupplierAction.UPDATE_SUPPLIER_REQUEST;
  payload: {
    materials: TUpdateSupplierMaterials;
    successCallback?: (response: TUpdateSupplierResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateSupplierSuccess = {
  type: EUpdateSupplierAction.UPDATE_SUPPLIER_SUCCESS;
  payload: { response: TUpdateSupplierResponse };
};

export type TUpdateSupplierFailed = { type: EUpdateSupplierAction.UPDATE_SUPPLIER_FAILED };

// FUNCTION

export const updateSupplierAction = {
  request: createActionCreator(
    EUpdateSupplierAction.UPDATE_SUPPLIER_REQUEST,
    (resolve) =>
      (
        materials: TUpdateSupplierMaterials,
        successCallback?: (response: TUpdateSupplierResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateSupplierRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateSupplierAction.UPDATE_SUPPLIER_SUCCESS,
    (resolve) =>
      (response: TUpdateSupplierResponse): TUpdateSupplierSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateSupplierAction.UPDATE_SUPPLIER_FAILED,
    (resolve) =>
      (error: unknown): TUpdateSupplierFailed =>
        resolve({ error }),
  ),
};
