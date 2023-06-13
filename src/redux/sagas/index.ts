import { all, fork } from 'redux-saga/effects';

import academySaga from './academy';
import attendanceSaga from './attendance';
import authSaga from './auth';
import branchSaga from './branch';
import busStopSaga from './bus-stop';
import categorySaga from './category';
import classSaga from './class';
import dashboardSaga from './dashboard';
import eConnectSaga from './e-connect';
import eventSaga from './event';
import expenseSaga from './expense';
import managerSaga from './manager';
import merchantSaga from './merchant';
import orderSaga from './order';
import playerSaga from './player';
import practiceSaga from './practice';
import productSaga from './product';
import redeemSaga from './redeem';
import rewardSaga from './reward';
import scheduleSaga from './schedule';
import settingSaga from './setting';
import supplierSaga from './supplier';
import timeOffSaga from './time-off';
import transactionSaga from './transaction';
import uploadSaga from './upload';
import userSaga from './user';

const rootSaga = function* root(): Generator {
  yield all([
    fork(academySaga),
    fork(attendanceSaga),
    fork(authSaga),
    fork(branchSaga),
    fork(busStopSaga),
    fork(categorySaga),
    fork(classSaga),
    fork(dashboardSaga),
    fork(eConnectSaga),
    fork(eventSaga),
    fork(expenseSaga),
    fork(managerSaga),
    fork(merchantSaga),
    fork(orderSaga),
    fork(playerSaga),
    fork(practiceSaga),
    fork(productSaga),
    fork(redeemSaga),
    fork(rewardSaga),
    fork(scheduleSaga),
    fork(settingSaga),
    fork(supplierSaga),
    fork(timeOffSaga),
    fork(transactionSaga),
    fork(uploadSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
