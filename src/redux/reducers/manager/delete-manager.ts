import { TManagerState } from '@/redux/reducers/manager';
import { TDeleteManagerSuccess } from '@/redux/actions/manager';

export const deleteManagerUpdateState = (state: TManagerState, action: TDeleteManagerSuccess): TManagerState => ({
  ...state,
  deleteManagerResponse: action.payload.response,
});
