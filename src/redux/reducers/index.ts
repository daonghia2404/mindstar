import { combineReducers } from 'redux';

import { loadingReducer, errorReducer, successReducer } from './status';
import academyReducer from './academy';
import attendanceReducer from './attendance';
import authReducer from './auth';
import branchReducer from './branch';
import busStopReducer from './bus-stop';
import categoryReducer from './category';
import classReducer from './class';
import dashboardReducer from './dashboard';
import eConnectReducer from './e-connect';
import eventReducer from './event';
import expenseReducer from './expense';
import managerReducer from './manager';
import merchantReducer from './merchant';
import orderReducer from './order';
import playerReducer from './player';
import practiceReducer from './practice';
import productReducer from './product';
import redeemReducer from './redeem';
import rewardReducer from './reward';
import scheduleReducer from './schedule';
import settingReducer from './setting';
import supplierReducer from './supplier';
import timeOffReducer from './time-off';
import transactionReducer from './transaction';
import uiReducer from './ui';
import uploadReducer from './upload';
import userReducer from './user';

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  successReducer,
  academyReducer,
  attendanceReducer,
  authReducer,
  branchReducer,
  busStopReducer,
  categoryReducer,
  classReducer,
  dashboardReducer,
  eConnectReducer,
  eventReducer,
  expenseReducer,
  managerReducer,
  merchantReducer,
  orderReducer,
  playerReducer,
  practiceReducer,
  productReducer,
  redeemReducer,
  rewardReducer,
  scheduleReducer,
  settingReducer,
  supplierReducer,
  timeOffReducer,
  transactionReducer,
  uiReducer,
  uploadReducer,
  userReducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
