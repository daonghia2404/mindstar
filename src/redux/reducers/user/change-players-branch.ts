import { TUserState } from '@/redux/reducers/user';
import { TChangePlayersBranchSuccess } from '@/redux/actions/user';

export const changePlayersBranchUpdateState = (state: TUserState, action: TChangePlayersBranchSuccess): TUserState => ({
  ...state,
  changePlayersBranchResponse: action.payload.response,
});
