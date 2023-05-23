import { TBranchState } from '@/redux/reducers/branch';
import { TGetBranchesSuccess } from '@/redux/actions/branch';

export const getBranchesUpdateState = (state: TBranchState, action: TGetBranchesSuccess): TBranchState => ({
  ...state,
  getBranchesResponse: action.payload.response,
});
