import { TPlayerState } from '@/redux/reducers/player';
import { TGetPlayerSuccess } from '@/redux/actions/player';

export const getPlayerUpdateState = (state: TPlayerState, action: TGetPlayerSuccess): TPlayerState => ({
  ...state,
  getPlayerResponse: action.payload.response,
});
