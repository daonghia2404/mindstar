import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteUploadImagesProductsAction } from '@/redux/actions';
import { deleteUploadImagesProducts, TDeleteUploadImagesProductsResponse } from '@/services/api';

// FUNCTION

export function* deleteUploadImagesProductsSaga(
  action: ActionType<typeof deleteUploadImagesProductsAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteUploadImagesProducts, materials);
    const deleteUploadImagesProductsResponse: TDeleteUploadImagesProductsResponse =
      response as TDeleteUploadImagesProductsResponse;
    yield put(deleteUploadImagesProductsAction.success(deleteUploadImagesProductsResponse));
    successCallback?.(deleteUploadImagesProductsResponse);
  } catch (err) {
    yield put(deleteUploadImagesProductsAction.failure(err));
    failedCallback?.(err);
  }
}
