import { TPlayerState } from '@/redux/reducers/player';
import { TChangePlayersBranchSuccess } from '@/redux/actions/player';

export const changePlayersBranchUpdateState = (
  state: TPlayerState,
  action: TChangePlayersBranchSuccess,
): TPlayerState => ({
  ...state,
  changePlayersBranchResponse: action.payload.response,
});
