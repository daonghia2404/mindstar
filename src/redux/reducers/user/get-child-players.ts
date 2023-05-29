import { TUserState } from '@/redux/reducers/user';
import { TGetChildPlayersSuccess } from '@/redux/actions/user';

export const getChildPlayersUpdateState = (state: TUserState, action: TGetChildPlayersSuccess): TUserState => ({
  ...state,
  getChildPlayersResponse: action.payload.response,
});
