import { TTimeOffState } from '@/redux/reducers/time-off';
import { TDeleteTimeOffSuccess } from '@/redux/actions/time-off';

export const deleteTimeOffUpdateState = (state: TTimeOffState, action: TDeleteTimeOffSuccess): TTimeOffState => ({
  ...state,
  deleteTimeOffResponse: action.payload.response,
});
