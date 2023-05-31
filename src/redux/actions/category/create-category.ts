import { createActionCreator } from 'deox';

import { TCreateCategoryMaterials, TCreateCategoryResponse } from '@/services/api/category/create-category';

// CONSTANTS

export enum ECreateCategoryAction {
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST',
  CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS',
  CREATE_CATEGORY_FAILED = 'CREATE_CATEGORY_FAILED',
}

// TYPES

export type TCreateCategoryRequest = {
  type: ECreateCategoryAction.CREATE_CATEGORY_REQUEST;
  payload: {
    materials: TCreateCategoryMaterials;
    successCallback?: (response: TCreateCategoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateCategorySuccess = {
  type: ECreateCategoryAction.CREATE_CATEGORY_SUCCESS;
  payload: { response: TCreateCategoryResponse };
};

export type TCreateCategoryFailed = { type: ECreateCategoryAction.CREATE_CATEGORY_FAILED };

// FUNCTION

export const createCategoryAction = {
  request: createActionCreator(
    ECreateCategoryAction.CREATE_CATEGORY_REQUEST,
    (resolve) =>
      (
        materials: TCreateCategoryMaterials,
        successCallback?: (response: TCreateCategoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateCategoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateCategoryAction.CREATE_CATEGORY_SUCCESS,
    (resolve) =>
      (response: TCreateCategoryResponse): TCreateCategorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateCategoryAction.CREATE_CATEGORY_FAILED,
    (resolve) =>
      (error: unknown): TCreateCategoryFailed =>
        resolve({ error }),
  ),
};
