import { combineReducers } from 'redux';

import { loadingReducer, errorReducer, successReducer } from './status';
import attendanceReducer from './attendance';
import authReducer from './auth';
import branchReducer from './branch';
import classReducer from './class';
import dashboardReducer from './dashboard';
import eConnectReducer from './e-connect';
import eventReducer from './event';
import expenseReducer from './expense';
import managerReducer from './manager';
import orderReducer from './order';
import playerReducer from './player';
import practiceReducer from './practice';
import redeemReducer from './redeem';
import scheduleReducer from './schedule';
import settingReducer from './setting';
import timeOffReducer from './time-off';
import transactionReducer from './transaction';
import uiReducer from './ui';
import uploadReducer from './upload';
import userReducer from './user';

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  successReducer,
  attendanceReducer,
  authReducer,
  branchReducer,
  classReducer,
  dashboardReducer,
  eConnectReducer,
  eventReducer,
  expenseReducer,
  managerReducer,
  orderReducer,
  playerReducer,
  practiceReducer,
  redeemReducer,
  scheduleReducer,
  settingReducer,
  timeOffReducer,
  transactionReducer,
  uiReducer,
  uploadReducer,
  userReducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
