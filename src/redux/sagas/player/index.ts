import { all, takeLatest } from 'redux-saga/effects';

import {
  createPlayerAction,
  deletePlayerAction,
  getPlayerAction,
  getPlayersAction,
  updatePlayerAction,
} from '@/redux/actions';

import { createPlayerSaga } from './create-player';
import { deletePlayerSaga } from './delete-player';
import { getPlayerSaga } from './get-player';
import { getPlayersSaga } from './get-players';
import { updatePlayerSaga } from './update-player';

export default function* root(): Generator {
  yield all([
    takeLatest(createPlayerAction.request.type, createPlayerSaga),
    takeLatest(deletePlayerAction.request.type, deletePlayerSaga),
    takeLatest(getPlayerAction.request.type, getPlayerSaga),
    takeLatest(getPlayersAction.request.type, getPlayersSaga),
    takeLatest(updatePlayerAction.request.type, updatePlayerSaga),
  ]);
}
