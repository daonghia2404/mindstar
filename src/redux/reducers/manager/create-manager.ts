import { TManagerState } from '@/redux/reducers/manager';
import { TCreateManagerSuccess } from '@/redux/actions/manager';

export const createManagerUpdateState = (state: TManagerState, action: TCreateManagerSuccess): TManagerState => ({
  ...state,
  createManagerResponse: action.payload.response,
});
