import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import branchSaga from './branch';
import dashboardSaga from './dashboard';
import expenseSaga from './expense';
import orderSaga from './order';
import redeemSaga from './redeem';
import scheduleSaga from './schedule';
import settingSaga from './setting';
import transactionSaga from './transaction';
import userSaga from './user';

const rootSaga = function* root(): Generator {
  yield all([
    fork(authSaga),
    fork(branchSaga),
    fork(dashboardSaga),
    fork(expenseSaga),
    fork(orderSaga),
    fork(redeemSaga),
    fork(scheduleSaga),
    fork(settingSaga),
    fork(transactionSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
