import { all, fork } from 'redux-saga/effects';

import attendanceSaga from './attendance';
import authSaga from './auth';
import branchSaga from './branch';
import classSaga from './class';
import dashboardSaga from './dashboard';
import eConnectSaga from './e-connect';
import eventSaga from './event';
import expenseSaga from './expense';
import managerSaga from './manager';
import orderSaga from './order';
import playerSaga from './player';
import practiceSaga from './practice';
import redeemSaga from './redeem';
import scheduleSaga from './schedule';
import settingSaga from './setting';
import timeOffSaga from './time-off';
import transactionSaga from './transaction';
import uploadSaga from './upload';
import userSaga from './user';

const rootSaga = function* root(): Generator {
  yield all([
    fork(attendanceSaga),
    fork(authSaga),
    fork(branchSaga),
    fork(classSaga),
    fork(dashboardSaga),
    fork(eConnectSaga),
    fork(eventSaga),
    fork(expenseSaga),
    fork(managerSaga),
    fork(orderSaga),
    fork(playerSaga),
    fork(practiceSaga),
    fork(redeemSaga),
    fork(scheduleSaga),
    fork(settingSaga),
    fork(timeOffSaga),
    fork(transactionSaga),
    fork(uploadSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
