import { createReducer } from 'deox';

import {
  TChangePlayersBranchResponse,
  TCreatePlayerResponse,
  TDeletePlayerResponse,
  TGetChildPlayersResponse,
  TGetPlayerResponse,
  TGetPlayersResponse,
  TUpdatePlayerResponse,
} from '@/services/api/player';
import {
  changePlayersBranchAction,
  createPlayerAction,
  deletePlayerAction,
  getChildPlayersAction,
  getPlayerAction,
  getPlayersAction,
  updatePlayerAction,
} from '@/redux/actions';
import { changePlayersBranchUpdateState } from './change-players-branch';
import { createPlayerUpdateState } from './create-player';
import { deletePlayerUpdateState } from './delete-player';
import { getChildPlayersUpdateState } from './get-child-players';
import { getPlayerUpdateState } from './get-player';
import { getPlayersUpdateState } from './get-players';
import { updatePlayerUpdateState } from './update-player';

export type TPlayerState = {
  changePlayersBranchResponse?: TChangePlayersBranchResponse;
  createPlayerResponse?: TCreatePlayerResponse;
  deletePlayerResponse?: TDeletePlayerResponse;
  getChildPlayersResponse?: TGetChildPlayersResponse;
  getPlayerResponse?: TGetPlayerResponse;
  getPlayersResponse?: TGetPlayersResponse;
  updatePlayerResponse?: TUpdatePlayerResponse;
};

const initialState: TPlayerState = {
  changePlayersBranchResponse: undefined,
  createPlayerResponse: undefined,
  deletePlayerResponse: undefined,
  getChildPlayersResponse: undefined,
  getPlayerResponse: undefined,
  getPlayersResponse: undefined,
  updatePlayerResponse: undefined,
};

const PlayerReducer = createReducer(initialState, (handleAction) => [
  handleAction(changePlayersBranchAction.success, changePlayersBranchUpdateState),
  handleAction(createPlayerAction.success, createPlayerUpdateState),
  handleAction(deletePlayerAction.success, deletePlayerUpdateState),
  handleAction(getChildPlayersAction.success, getChildPlayersUpdateState),
  handleAction(getPlayerAction.success, getPlayerUpdateState),
  handleAction(getPlayersAction.success, getPlayersUpdateState),
  handleAction(updatePlayerAction.success, updatePlayerUpdateState),
]);

export default PlayerReducer;
