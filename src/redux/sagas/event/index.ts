import { all, takeLatest } from 'redux-saga/effects';

import { createEventAction, deleteEventAction, getEventsAction, updateEventAction } from '@/redux/actions';

import { createEventSaga } from './create-event';
import { deleteEventSaga } from './delete-event';
import { getEventsSaga } from './get-events';
import { updateEventSaga } from './update-event';

export default function* root(): Generator {
  yield all([
    takeLatest(createEventAction.request.type, createEventSaga),
    takeLatest(deleteEventAction.request.type, deleteEventSaga),
    takeLatest(getEventsAction.request.type, getEventsSaga),
    takeLatest(updateEventAction.request.type, updateEventSaga),
  ]);
}
