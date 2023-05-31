import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updatePracticeAction } from '@/redux/actions';
import { updatePractice, TUpdatePracticeResponse } from '@/services/api';

// FUNCTION

export function* updatePracticeSaga(action: ActionType<typeof updatePracticeAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updatePractice, materials);
    const updatePracticeResponse: TUpdatePracticeResponse = response as TUpdatePracticeResponse;
    yield put(updatePracticeAction.success(updatePracticeResponse));
    successCallback?.(updatePracticeResponse);
  } catch (err) {
    yield put(updatePracticeAction.failure(err));
    failedCallback?.(err);
  }
}
