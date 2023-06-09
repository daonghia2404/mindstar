import { TPlayerState } from '@/redux/reducers/player';
import { TReactivePlayerSuccess } from '@/redux/actions/player';

export const reactivePlayerUpdateState = (state: TPlayerState, action: TReactivePlayerSuccess): TPlayerState => ({
  ...state,
  reactivePlayerResponse: action.payload.response,
});
