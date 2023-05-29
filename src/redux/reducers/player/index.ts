import { createReducer } from 'deox';

import {
  TCreatePlayerResponse,
  TDeletePlayerResponse,
  TGetPlayerResponse,
  TGetPlayersResponse,
  TUpdatePlayerResponse,
} from '@/services/api/player';
import {
  createPlayerAction,
  deletePlayerAction,
  getPlayerAction,
  getPlayersAction,
  updatePlayerAction,
} from '@/redux/actions';
import { createPlayerUpdateState } from './create-player';
import { deletePlayerUpdateState } from './delete-player';
import { getPlayerUpdateState } from './get-player';
import { getPlayersUpdateState } from './get-players';
import { updatePlayerUpdateState } from './update-player';

export type TPlayerState = {
  createPlayerResponse?: TCreatePlayerResponse;
  deletePlayerResponse?: TDeletePlayerResponse;
  getPlayerResponse?: TGetPlayerResponse;
  getPlayersResponse?: TGetPlayersResponse;
  updatePlayerResponse?: TUpdatePlayerResponse;
};

const initialState: TPlayerState = {
  createPlayerResponse: undefined,
  deletePlayerResponse: undefined,
  getPlayerResponse: undefined,
  getPlayersResponse: undefined,
  updatePlayerResponse: undefined,
};

const PlayerReducer = createReducer(initialState, (handleAction) => [
  handleAction(createPlayerAction.success, createPlayerUpdateState),
  handleAction(deletePlayerAction.success, deletePlayerUpdateState),
  handleAction(getPlayerAction.success, getPlayerUpdateState),
  handleAction(getPlayersAction.success, getPlayersUpdateState),
  handleAction(updatePlayerAction.success, updatePlayerUpdateState),
]);

export default PlayerReducer;
