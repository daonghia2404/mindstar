import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCategoriesAction } from '@/redux/actions';
import { getCategories, TGetCategoriesResponse } from '@/services/api';

// FUNCTION

export function* getCategoriesSaga(action: ActionType<typeof getCategoriesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCategories, materials);
    const getCategoriesResponse: TGetCategoriesResponse = response as TGetCategoriesResponse;
    yield put(getCategoriesAction.success(getCategoriesResponse));
    successCallback?.(getCategoriesResponse);
  } catch (err) {
    yield put(getCategoriesAction.failure(err));
    failedCallback?.(err);
  }
}
