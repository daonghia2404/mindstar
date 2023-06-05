import { createActionCreator } from 'deox';

import { TCreateSupplierMaterials, TCreateSupplierResponse } from '@/services/api/supplier/create-supplier';

// CONSTANTS

export enum ECreateSupplierAction {
  CREATE_SUPPLIER = 'CREATE_SUPPLIER',
  CREATE_SUPPLIER_REQUEST = 'CREATE_SUPPLIER_REQUEST',
  CREATE_SUPPLIER_SUCCESS = 'CREATE_SUPPLIER_SUCCESS',
  CREATE_SUPPLIER_FAILED = 'CREATE_SUPPLIER_FAILED',
}

// TYPES

export type TCreateSupplierRequest = {
  type: ECreateSupplierAction.CREATE_SUPPLIER_REQUEST;
  payload: {
    materials: TCreateSupplierMaterials;
    successCallback?: (response: TCreateSupplierResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateSupplierSuccess = {
  type: ECreateSupplierAction.CREATE_SUPPLIER_SUCCESS;
  payload: { response: TCreateSupplierResponse };
};

export type TCreateSupplierFailed = { type: ECreateSupplierAction.CREATE_SUPPLIER_FAILED };

// FUNCTION

export const createSupplierAction = {
  request: createActionCreator(
    ECreateSupplierAction.CREATE_SUPPLIER_REQUEST,
    (resolve) =>
      (
        materials: TCreateSupplierMaterials,
        successCallback?: (response: TCreateSupplierResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateSupplierRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateSupplierAction.CREATE_SUPPLIER_SUCCESS,
    (resolve) =>
      (response: TCreateSupplierResponse): TCreateSupplierSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateSupplierAction.CREATE_SUPPLIER_FAILED,
    (resolve) =>
      (error: unknown): TCreateSupplierFailed =>
        resolve({ error }),
  ),
};
