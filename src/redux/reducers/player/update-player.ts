import { TPlayerState } from '@/redux/reducers/player';
import { TUpdatePlayerSuccess } from '@/redux/actions/player';

export const updatePlayerUpdateState = (state: TPlayerState, action: TUpdatePlayerSuccess): TPlayerState => ({
  ...state,
  updatePlayerResponse: action.payload.response,
});
