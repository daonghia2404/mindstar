import { TBranchState } from '@/redux/reducers/branch';
import { TGetPublicBranchesSuccess } from '@/redux/actions/branch';

export const getPublicBranchesUpdateState = (state: TBranchState, action: TGetPublicBranchesSuccess): TBranchState => ({
  ...state,
  getPublicBranchesResponse: action.payload.response,
});
