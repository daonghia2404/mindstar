import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TUpdateBusStopPlayerSuccess } from '@/redux/actions/bus-stop';

export const updateBusStopPlayerUpdateState = (
  state: TBusStopState,
  action: TUpdateBusStopPlayerSuccess,
): TBusStopState => ({
  ...state,
  updateBusStopPlayerResponse: action.payload.response,
});
