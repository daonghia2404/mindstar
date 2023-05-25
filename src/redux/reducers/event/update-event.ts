import { TEventState } from '@/redux/reducers/event';
import { TUpdateEventSuccess } from '@/redux/actions/event';

export const updateEventUpdateState = (state: TEventState, action: TUpdateEventSuccess): TEventState => ({
  ...state,
  updateEventResponse: action.payload.response,
});
