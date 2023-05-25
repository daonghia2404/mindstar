import { createReducer } from 'deox';

import {
  TCreateEventResponse,
  TDeleteEventResponse,
  TGetEventsResponse,
  TUpdateEventResponse,
} from '@/services/api/event';
import { createEventAction, deleteEventAction, getEventsAction, updateEventAction } from '@/redux/actions';
import { createEventUpdateState } from './create-event';
import { deleteEventUpdateState } from './delete-event';
import { getEventsUpdateState } from './get-events';
import { updateEventUpdateState } from './update-event';

export type TEventState = {
  createEventResponse?: TCreateEventResponse;
  deleteEventResponse?: TDeleteEventResponse;
  getEventsResponse?: TGetEventsResponse;
  updateEventResponse?: TUpdateEventResponse;
};

const initialState: TEventState = {
  createEventResponse: undefined,
  deleteEventResponse: undefined,
  getEventsResponse: undefined,
  updateEventResponse: undefined,
};

const EventReducer = createReducer(initialState, (handleAction) => [
  handleAction(createEventAction.success, createEventUpdateState),
  handleAction(deleteEventAction.success, deleteEventUpdateState),
  handleAction(getEventsAction.success, getEventsUpdateState),
  handleAction(updateEventAction.success, updateEventUpdateState),
]);

export default EventReducer;
