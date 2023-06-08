import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TGetPickupAttendancesSuccess } from '@/redux/actions/bus-stop';

export const getPickupAttendancesUpdateState = (
  state: TBusStopState,
  action: TGetPickupAttendancesSuccess,
): TBusStopState => ({
  ...state,
  getPickupAttendancesResponse: action.payload.response,
});
