import { TEventState } from '@/redux/reducers/event';
import { TGetEventsSuccess } from '@/redux/actions/event';

export const getEventsUpdateState = (state: TEventState, action: TGetEventsSuccess): TEventState => ({
  ...state,
  getEventsResponse: action.payload.response,
});
