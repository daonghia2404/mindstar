import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TDeleteBusStopPlayerSuccess } from '@/redux/actions/bus-stop';

export const deleteBusStopPlayerUpdateState = (
  state: TBusStopState,
  action: TDeleteBusStopPlayerSuccess,
): TBusStopState => ({
  ...state,
  deleteBusStopPlayerResponse: action.payload.response,
});
