import { TPlayerState } from '@/redux/reducers/player';
import { TGetChildPlayersSuccess } from '@/redux/actions/player';

export const getChildPlayersUpdateState = (state: TPlayerState, action: TGetChildPlayersSuccess): TPlayerState => ({
  ...state,
  getChildPlayersResponse: action.payload.response,
});
