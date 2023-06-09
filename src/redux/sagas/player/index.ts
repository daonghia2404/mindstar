import { all, takeLatest } from 'redux-saga/effects';

import {
  changePlayersBranchAction,
  createPlayerAction,
  deletePlayerAction,
  getChildPlayersAction,
  getPlayerAction,
  getPlayersAction,
  reactivePlayerAction,
  updatePlayerAction,
} from '@/redux/actions';

import { changePlayersBranchSaga } from './change-players-branch';
import { createPlayerSaga } from './create-player';
import { deletePlayerSaga } from './delete-player';
import { getChildPlayersSaga } from './get-child-players';
import { getPlayerSaga } from './get-player';
import { getPlayersSaga } from './get-players';
import { reactivePlayerSaga } from './reactive-player';
import { updatePlayerSaga } from './update-player';

export default function* root(): Generator {
  yield all([
    takeLatest(changePlayersBranchAction.request.type, changePlayersBranchSaga),
    takeLatest(createPlayerAction.request.type, createPlayerSaga),
    takeLatest(deletePlayerAction.request.type, deletePlayerSaga),
    takeLatest(getChildPlayersAction.request.type, getChildPlayersSaga),
    takeLatest(getPlayerAction.request.type, getPlayerSaga),
    takeLatest(getPlayersAction.request.type, getPlayersSaga),
    takeLatest(reactivePlayerAction.request.type, reactivePlayerSaga),
    takeLatest(updatePlayerAction.request.type, updatePlayerSaga),
  ]);
}
