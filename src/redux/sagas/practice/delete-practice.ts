import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deletePracticeAction } from '@/redux/actions';
import { deletePractice, TDeletePracticeResponse } from '@/services/api';

// FUNCTION

export function* deletePracticeSaga(action: ActionType<typeof deletePracticeAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deletePractice, materials);
    const deletePracticeResponse: TDeletePracticeResponse = response as TDeletePracticeResponse;
    yield put(deletePracticeAction.success(deletePracticeResponse));
    successCallback?.(deletePracticeResponse);
  } catch (err) {
    yield put(deletePracticeAction.failure(err));
    failedCallback?.(err);
  }
}
