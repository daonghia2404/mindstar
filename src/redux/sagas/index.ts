import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import branchSaga from './branch';
import classSaga from './class';
import dashboardSaga from './dashboard';
import eventSaga from './event';
import expenseSaga from './expense';
import managerSaga from './manager';
import orderSaga from './order';
import redeemSaga from './redeem';
import scheduleSaga from './schedule';
import settingSaga from './setting';
import transactionSaga from './transaction';
import uploadSaga from './upload';
import userSaga from './user';

const rootSaga = function* root(): Generator {
  yield all([
    fork(authSaga),
    fork(branchSaga),
    fork(classSaga),
    fork(dashboardSaga),
    fork(eventSaga),
    fork(expenseSaga),
    fork(managerSaga),
    fork(orderSaga),
    fork(redeemSaga),
    fork(scheduleSaga),
    fork(settingSaga),
    fork(transactionSaga),
    fork(uploadSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
