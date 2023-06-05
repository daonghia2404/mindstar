import { all, takeLatest } from 'redux-saga/effects';

import {
  changePlayersBranchAction,
  createPlayerAction,
  deletePlayerAction,
  getChildPlayersAction,
  getPlayerAction,
  getPlayersAction,
  updatePlayerAction,
} from '@/redux/actions';

import { changePlayersBranchSaga } from './change-players-branch';
import { createPlayerSaga } from './create-player';
import { deletePlayerSaga } from './delete-player';
import { getChildPlayersSaga } from './get-child-players';
import { getPlayerSaga } from './get-player';
import { getPlayersSaga } from './get-players';
import { updatePlayerSaga } from './update-player';

export default function* root(): Generator {
  yield all([
    takeLatest(changePlayersBranchAction.request.type, changePlayersBranchSaga),
    takeLatest(createPlayerAction.request.type, createPlayerSaga),
    takeLatest(deletePlayerAction.request.type, deletePlayerSaga),
    takeLatest(getChildPlayersAction.request.type, getChildPlayersSaga),
    takeLatest(getPlayerAction.request.type, getPlayerSaga),
    takeLatest(getPlayersAction.request.type, getPlayersSaga),
    takeLatest(updatePlayerAction.request.type, updatePlayerSaga),
  ]);
}
