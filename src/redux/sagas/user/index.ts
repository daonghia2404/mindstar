import { all, takeLatest } from 'redux-saga/effects';

import {
  changePlayersBranchAction,
  getChildPlayersAction,
  getMyProfileAction,
  resetPasswordAction,
  searchUserAction,
} from '@/redux/actions';

import { changePlayersBranchSaga } from './change-players-branch';
import { getChildPlayersSaga } from './get-child-players';
import { getMyProfileSaga } from './get-my-profile';
import { resetPasswordSaga } from './reset-password';
import { searchUserSaga } from './search-user';

export default function* root(): Generator {
  yield all([
    takeLatest(changePlayersBranchAction.request.type, changePlayersBranchSaga),
    takeLatest(getChildPlayersAction.request.type, getChildPlayersSaga),
    takeLatest(getMyProfileAction.request.type, getMyProfileSaga),
    takeLatest(resetPasswordAction.request.type, resetPasswordSaga),
    takeLatest(searchUserAction.request.type, searchUserSaga),
  ]);
}
