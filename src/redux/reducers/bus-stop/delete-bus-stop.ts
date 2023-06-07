import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TDeleteBusStopSuccess } from '@/redux/actions/bus-stop';

export const deleteBusStopUpdateState = (state: TBusStopState, action: TDeleteBusStopSuccess): TBusStopState => ({
  ...state,
  deleteBusStopResponse: action.payload.response,
});
