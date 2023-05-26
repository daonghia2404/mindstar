import { TPlayerState } from '@/redux/reducers/player';
import { TDeletePlayerSuccess } from '@/redux/actions/player';

export const deletePlayerUpdateState = (state: TPlayerState, action: TDeletePlayerSuccess): TPlayerState => ({
  ...state,
  deletePlayerResponse: action.payload.response,
});
