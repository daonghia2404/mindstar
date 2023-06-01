import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { uploadImagesProductAction } from '@/redux/actions';
import { uploadImagesProduct, TUploadImagesProductResponse } from '@/services/api';

// FUNCTION

export function* uploadImagesProductSaga(action: ActionType<typeof uploadImagesProductAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(uploadImagesProduct, materials);
    const uploadImagesProductResponse: TUploadImagesProductResponse = response as TUploadImagesProductResponse;
    yield put(uploadImagesProductAction.success(uploadImagesProductResponse));
    successCallback?.(uploadImagesProductResponse);
  } catch (err) {
    yield put(uploadImagesProductAction.failure(err));
    failedCallback?.(err);
  }
}
