import { TTimeOffState } from '@/redux/reducers/time-off';
import { TGetTimeOffsSuccess } from '@/redux/actions/time-off';

export const getTimeOffsUpdateState = (state: TTimeOffState, action: TGetTimeOffsSuccess): TTimeOffState => ({
  ...state,
  getTimeOffsResponse: action.payload.response,
});
