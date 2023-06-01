import { createActionCreator } from 'deox';

import {
  TDeleteUploadImagesProductsMaterials,
  TDeleteUploadImagesProductsResponse,
} from '@/services/api/upload/delete-upload-images-products';

// CONSTANTS

export enum EDeleteUploadImagesProductsAction {
  DELETE_UPLOAD_IMAGES_PRODUCTS = 'DELETE_UPLOAD_IMAGES_PRODUCTS',
  DELETE_UPLOAD_IMAGES_PRODUCTS_REQUEST = 'DELETE_UPLOAD_IMAGES_PRODUCTS_REQUEST',
  DELETE_UPLOAD_IMAGES_PRODUCTS_SUCCESS = 'DELETE_UPLOAD_IMAGES_PRODUCTS_SUCCESS',
  DELETE_UPLOAD_IMAGES_PRODUCTS_FAILED = 'DELETE_UPLOAD_IMAGES_PRODUCTS_FAILED',
}

// TYPES

export type TDeleteUploadImagesProductsRequest = {
  type: EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_REQUEST;
  payload: {
    materials: TDeleteUploadImagesProductsMaterials;
    successCallback?: (response: TDeleteUploadImagesProductsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteUploadImagesProductsSuccess = {
  type: EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_SUCCESS;
  payload: { response: TDeleteUploadImagesProductsResponse };
};

export type TDeleteUploadImagesProductsFailed = {
  type: EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_FAILED;
};

// FUNCTION

export const deleteUploadImagesProductsAction = {
  request: createActionCreator(
    EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteUploadImagesProductsMaterials,
        successCallback?: (response: TDeleteUploadImagesProductsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteUploadImagesProductsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_SUCCESS,
    (resolve) =>
      (response: TDeleteUploadImagesProductsResponse): TDeleteUploadImagesProductsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteUploadImagesProductsFailed =>
        resolve({ error }),
  ),
};
