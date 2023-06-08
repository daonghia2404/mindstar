import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TCreateBusStopPlayerSuccess } from '@/redux/actions/bus-stop';

export const createBusStopPlayerUpdateState = (
  state: TBusStopState,
  action: TCreateBusStopPlayerSuccess,
): TBusStopState => ({
  ...state,
  createBusStopPlayerResponse: action.payload.response,
});
