import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TGetBusStopsSuccess } from '@/redux/actions/bus-stop';

export const getBusStopsUpdateState = (state: TBusStopState, action: TGetBusStopsSuccess): TBusStopState => ({
  ...state,
  getBusStopsResponse: action.payload.response,
});
