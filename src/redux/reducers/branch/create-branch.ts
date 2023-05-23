import { TBranchState } from '@/redux/reducers/branch';
import { TCreateBranchSuccess } from '@/redux/actions/branch';

export const createBranchUpdateState = (state: TBranchState, action: TCreateBranchSuccess): TBranchState => ({
  ...state,
  createBranchResponse: action.payload.response,
});
