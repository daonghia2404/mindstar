import { TBusStopState } from '@/redux/reducers/bus-stop';
import { TUpdatePickupAttendancesSuccess } from '@/redux/actions/bus-stop';

export const updatePickupAttendancesUpdateState = (
  state: TBusStopState,
  action: TUpdatePickupAttendancesSuccess,
): TBusStopState => ({
  ...state,
  updatePickupAttendancesResponse: action.payload.response,
});
