import { TEventState } from '@/redux/reducers/event';
import { TDeleteEventSuccess } from '@/redux/actions/event';

export const deleteEventUpdateState = (state: TEventState, action: TDeleteEventSuccess): TEventState => ({
  ...state,
  deleteEventResponse: action.payload.response,
});
