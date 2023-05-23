import { TBranchState } from '@/redux/reducers/branch';
import { TDeleteBranchSuccess } from '@/redux/actions/branch';

export const deleteBranchUpdateState = (state: TBranchState, action: TDeleteBranchSuccess): TBranchState => ({
  ...state,
  deleteBranchResponse: action.payload.response,
});
