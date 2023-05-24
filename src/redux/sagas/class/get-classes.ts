import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getClassesAction } from '@/redux/actions';
import { getClasses, TGetClassesResponse } from '@/services/api';

// FUNCTION

export function* getClassesSaga(action: ActionType<typeof getClassesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getClasses, materials);
    const getClassesResponse: TGetClassesResponse = response as TGetClassesResponse;
    yield put(getClassesAction.success(getClassesResponse));
    successCallback?.(getClassesResponse);
  } catch (err) {
    yield put(getClassesAction.failure(err));
    failedCallback?.(err);
  }
}
