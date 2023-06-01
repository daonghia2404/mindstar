import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createCategoryAction } from '@/redux/actions';
import { createCategory, TCreateCategoryResponse } from '@/services/api';

// FUNCTION

export function* createCategorySaga(action: ActionType<typeof createCategoryAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createCategory, materials);
    const createCategoryResponse: TCreateCategoryResponse = response as TCreateCategoryResponse;
    yield put(createCategoryAction.success(createCategoryResponse));
    successCallback?.(createCategoryResponse);
  } catch (err) {
    yield put(createCategoryAction.failure(err));
    failedCallback?.(err);
  }
}
