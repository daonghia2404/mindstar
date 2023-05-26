import { TPlayerState } from '@/redux/reducers/player';
import { TGetPlayersSuccess } from '@/redux/actions/player';

export const getPlayersUpdateState = (state: TPlayerState, action: TGetPlayersSuccess): TPlayerState => ({
  ...state,
  getPlayersResponse: action.payload.response,
});
