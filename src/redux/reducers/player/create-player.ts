import { TPlayerState } from '@/redux/reducers/player';
import { TCreatePlayerSuccess } from '@/redux/actions/player';

export const createPlayerUpdateState = (state: TPlayerState, action: TCreatePlayerSuccess): TPlayerState => ({
  ...state,
  createPlayerResponse: action.payload.response,
});
