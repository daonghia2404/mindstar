import { createReducer } from 'deox';

import {
  TCreateBranchResponse,
  TDeleteBranchResponse,
  TGetBranchesResponse,
  TGetCommonBranchesResponse,
  TGetPublicBranchesResponse,
  TUpdateBranchResponse,
} from '@/services/api/branch';
import {
  createBranchAction,
  deleteBranchAction,
  getBranchesAction,
  getCommonBranchesAction,
  getPublicBranchesAction,
  updateBranchAction,
} from '@/redux/actions';
import { createBranchUpdateState } from './create-branch';
import { deleteBranchUpdateState } from './delete-branch';
import { getBranchesUpdateState } from './get-branches';
import { getCommonBranchesUpdateState } from './get-common-branches';
import { getPublicBranchesUpdateState } from './get-public-branches';
import { updateBranchUpdateState } from './update-branch';

export type TBranchState = {
  createBranchResponse?: TCreateBranchResponse;
  deleteBranchResponse?: TDeleteBranchResponse;
  getBranchesResponse?: TGetBranchesResponse;
  getCommonBranchesResponse?: TGetCommonBranchesResponse;
  getPublicBranchesResponse?: TGetPublicBranchesResponse;
  updateBranchResponse?: TUpdateBranchResponse;
};

const initialState: TBranchState = {
  createBranchResponse: undefined,
  deleteBranchResponse: undefined,
  getBranchesResponse: undefined,
  getCommonBranchesResponse: undefined,
  getPublicBranchesResponse: undefined,
  updateBranchResponse: undefined,
};

const BranchReducer = createReducer(initialState, (handleAction) => [
  handleAction(createBranchAction.success, createBranchUpdateState),
  handleAction(deleteBranchAction.success, deleteBranchUpdateState),
  handleAction(getBranchesAction.success, getBranchesUpdateState),
  handleAction(getCommonBranchesAction.success, getCommonBranchesUpdateState),
  handleAction(getPublicBranchesAction.success, getPublicBranchesUpdateState),
  handleAction(updateBranchAction.success, updateBranchUpdateState),
]);

export default BranchReducer;
