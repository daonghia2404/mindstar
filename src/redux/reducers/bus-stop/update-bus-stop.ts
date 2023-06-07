import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TUpdateBusStopSuccess } from '@/redux/actions/bus-stop';

export const updateBusStopUpdateState = (state: TBusStopState, action: TUpdateBusStopSuccess): TBusStopState => ({
  ...state,
  updateBusStopResponse: action.payload.response,
});
