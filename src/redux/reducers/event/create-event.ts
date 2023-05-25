import { TEventState } from '@/redux/reducers/event';
import { TCreateEventSuccess } from '@/redux/actions/event';

export const createEventUpdateState = (state: TEventState, action: TCreateEventSuccess): TEventState => ({
  ...state,
  createEventResponse: action.payload.response,
});
