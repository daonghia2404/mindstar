import { TBranchState } from '@/redux/reducers/branch';
import { TGetCommonBranchesSuccess } from '@/redux/actions/branch';

export const getCommonBranchesUpdateState = (state: TBranchState, action: TGetCommonBranchesSuccess): TBranchState => ({
  ...state,
  getCommonBranchesResponse: action.payload.response,
});
