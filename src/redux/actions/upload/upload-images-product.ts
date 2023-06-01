import { createActionCreator } from 'deox';

import {
  TUploadImagesProductMaterials,
  TUploadImagesProductResponse,
} from '@/services/api/upload/upload-images-product';

// CONSTANTS

export enum EUploadImagesProductAction {
  UPLOAD_IMAGES_PRODUCT = 'UPLOAD_IMAGES_PRODUCT',
  UPLOAD_IMAGES_PRODUCT_REQUEST = 'UPLOAD_IMAGES_PRODUCT_REQUEST',
  UPLOAD_IMAGES_PRODUCT_SUCCESS = 'UPLOAD_IMAGES_PRODUCT_SUCCESS',
  UPLOAD_IMAGES_PRODUCT_FAILED = 'UPLOAD_IMAGES_PRODUCT_FAILED',
}

// TYPES

export type TUploadImagesProductRequest = {
  type: EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_REQUEST;
  payload: {
    materials: TUploadImagesProductMaterials;
    successCallback?: (response: TUploadImagesProductResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUploadImagesProductSuccess = {
  type: EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_SUCCESS;
  payload: { response: TUploadImagesProductResponse };
};

export type TUploadImagesProductFailed = { type: EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_FAILED };

// FUNCTION

export const uploadImagesProductAction = {
  request: createActionCreator(
    EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_REQUEST,
    (resolve) =>
      (
        materials: TUploadImagesProductMaterials,
        successCallback?: (response: TUploadImagesProductResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUploadImagesProductRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_SUCCESS,
    (resolve) =>
      (response: TUploadImagesProductResponse): TUploadImagesProductSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT_FAILED,
    (resolve) =>
      (error: unknown): TUploadImagesProductFailed =>
        resolve({ error }),
  ),
};
