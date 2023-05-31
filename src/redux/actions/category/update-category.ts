import { createActionCreator } from 'deox';

import { TUpdateCategoryMaterials, TUpdateCategoryResponse } from '@/services/api/category/update-category';

// CONSTANTS

export enum EUpdateCategoryAction {
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST',
  UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS',
  UPDATE_CATEGORY_FAILED = 'UPDATE_CATEGORY_FAILED',
}

// TYPES

export type TUpdateCategoryRequest = {
  type: EUpdateCategoryAction.UPDATE_CATEGORY_REQUEST;
  payload: {
    materials: TUpdateCategoryMaterials;
    successCallback?: (response: TUpdateCategoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateCategorySuccess = {
  type: EUpdateCategoryAction.UPDATE_CATEGORY_SUCCESS;
  payload: { response: TUpdateCategoryResponse };
};

export type TUpdateCategoryFailed = { type: EUpdateCategoryAction.UPDATE_CATEGORY_FAILED };

// FUNCTION

export const updateCategoryAction = {
  request: createActionCreator(
    EUpdateCategoryAction.UPDATE_CATEGORY_REQUEST,
    (resolve) =>
      (
        materials: TUpdateCategoryMaterials,
        successCallback?: (response: TUpdateCategoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateCategoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateCategoryAction.UPDATE_CATEGORY_SUCCESS,
    (resolve) =>
      (response: TUpdateCategoryResponse): TUpdateCategorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateCategoryAction.UPDATE_CATEGORY_FAILED,
    (resolve) =>
      (error: unknown): TUpdateCategoryFailed =>
        resolve({ error }),
  ),
};
