import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteCategoryAction } from '@/redux/actions';
import { deleteCategory, TDeleteCategoryResponse } from '@/services/api';

// FUNCTION

export function* deleteCategorySaga(action: ActionType<typeof deleteCategoryAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteCategory, materials);
    const deleteCategoryResponse: TDeleteCategoryResponse = response as TDeleteCategoryResponse;
    yield put(deleteCategoryAction.success(deleteCategoryResponse));
    successCallback?.(deleteCategoryResponse);
  } catch (err) {
    yield put(deleteCategoryAction.failure(err));
    failedCallback?.(err);
  }
}
