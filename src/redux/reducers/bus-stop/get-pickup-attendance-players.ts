import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TGetPickupAttendancePlayersSuccess } from '@/redux/actions/bus-stop';

export const getPickupAttendancePlayersUpdateState = (
  state: TBusStopState,
  action: TGetPickupAttendancePlayersSuccess,
): TBusStopState => ({
  ...state,
  getPickupAttendancePlayersResponse: action.payload.response,
});
