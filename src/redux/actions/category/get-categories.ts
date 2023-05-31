import { createActionCreator } from 'deox';

import { TGetCategoriesMaterials, TGetCategoriesResponse } from '@/services/api/category/get-categories';

// CONSTANTS

export enum EGetCategoriesAction {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED',
}

// TYPES

export type TGetCategoriesRequest = {
  type: EGetCategoriesAction.GET_CATEGORIES_REQUEST;
  payload: {
    materials: TGetCategoriesMaterials;
    successCallback?: (response: TGetCategoriesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCategoriesSuccess = {
  type: EGetCategoriesAction.GET_CATEGORIES_SUCCESS;
  payload: { response: TGetCategoriesResponse };
};

export type TGetCategoriesFailed = { type: EGetCategoriesAction.GET_CATEGORIES_FAILED };

// FUNCTION

export const getCategoriesAction = {
  request: createActionCreator(
    EGetCategoriesAction.GET_CATEGORIES_REQUEST,
    (resolve) =>
      (
        materials: TGetCategoriesMaterials,
        successCallback?: (response: TGetCategoriesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCategoriesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCategoriesAction.GET_CATEGORIES_SUCCESS,
    (resolve) =>
      (response: TGetCategoriesResponse): TGetCategoriesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCategoriesAction.GET_CATEGORIES_FAILED,
    (resolve) =>
      (error: unknown): TGetCategoriesFailed =>
        resolve({ error }),
  ),
};
