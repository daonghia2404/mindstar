import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TGetBusStopPlayersSuccess } from '@/redux/actions/bus-stop';

export const getBusStopPlayersUpdateState = (
  state: TBusStopState,
  action: TGetBusStopPlayersSuccess,
): TBusStopState => ({
  ...state,
  getBusStopPlayersResponse: action.payload.response,
});
