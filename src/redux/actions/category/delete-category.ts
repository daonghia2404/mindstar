import { createActionCreator } from 'deox';

import { TDeleteCategoryMaterials, TDeleteCategoryResponse } from '@/services/api/category/delete-category';

// CONSTANTS

export enum EDeleteCategoryAction {
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST',
  DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_FAILED = 'DELETE_CATEGORY_FAILED',
}

// TYPES

export type TDeleteCategoryRequest = {
  type: EDeleteCategoryAction.DELETE_CATEGORY_REQUEST;
  payload: {
    materials: TDeleteCategoryMaterials;
    successCallback?: (response: TDeleteCategoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteCategorySuccess = {
  type: EDeleteCategoryAction.DELETE_CATEGORY_SUCCESS;
  payload: { response: TDeleteCategoryResponse };
};

export type TDeleteCategoryFailed = { type: EDeleteCategoryAction.DELETE_CATEGORY_FAILED };

// FUNCTION

export const deleteCategoryAction = {
  request: createActionCreator(
    EDeleteCategoryAction.DELETE_CATEGORY_REQUEST,
    (resolve) =>
      (
        materials: TDeleteCategoryMaterials,
        successCallback?: (response: TDeleteCategoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteCategoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteCategoryAction.DELETE_CATEGORY_SUCCESS,
    (resolve) =>
      (response: TDeleteCategoryResponse): TDeleteCategorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteCategoryAction.DELETE_CATEGORY_FAILED,
    (resolve) =>
      (error: unknown): TDeleteCategoryFailed =>
        resolve({ error }),
  ),
};
