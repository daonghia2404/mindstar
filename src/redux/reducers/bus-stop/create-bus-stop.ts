import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TCreateBusStopSuccess } from '@/redux/actions/bus-stop';

export const createBusStopUpdateState = (state: TBusStopState, action: TCreateBusStopSuccess): TBusStopState => ({
  ...state,
  createBusStopResponse: action.payload.response,
});
