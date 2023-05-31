import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateCategoryAction } from '@/redux/actions';
import { updateCategory, TUpdateCategoryResponse } from '@/services/api';

// FUNCTION

export function* updateCategorySaga(action: ActionType<typeof updateCategoryAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateCategory, materials);
    const updateCategoryResponse: TUpdateCategoryResponse = response as TUpdateCategoryResponse;
    yield put(updateCategoryAction.success(updateCategoryResponse));
    successCallback?.(updateCategoryResponse);
  } catch (err) {
    yield put(updateCategoryAction.failure(err));
    failedCallback?.(err);
  }
}
