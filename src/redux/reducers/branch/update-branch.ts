import { TBranchState } from '@/redux/reducers/branch';
import { TUpdateBranchSuccess } from '@/redux/actions/branch';

export const updateBranchUpdateState = (state: TBranchState, action: TUpdateBranchSuccess): TBranchState => ({
  ...state,
  updateBranchResponse: action.payload.response,
});
