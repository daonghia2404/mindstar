import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import branchSaga from './branch';
import classSaga from './class';
import dashboardSaga from './dashboard';
import expenseSaga from './expense';
import managerSaga from './manager';
import orderSaga from './order';
import redeemSaga from './redeem';
import scheduleSaga from './schedule';
import settingSaga from './setting';
import timeOffSaga from './time-off';
import transactionSaga from './transaction';
import userSaga from './user';

const rootSaga = function* root(): Generator {
  yield all([
    fork(authSaga),
    fork(branchSaga),
    fork(classSaga),
    fork(dashboardSaga),
    fork(expenseSaga),
    fork(managerSaga),
    fork(orderSaga),
    fork(redeemSaga),
    fork(scheduleSaga),
    fork(settingSaga),
    fork(timeOffSaga),
    fork(transactionSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
