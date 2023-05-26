import { combineReducers } from 'redux';

import { loadingReducer, errorReducer, successReducer } from './status';
import authReducer from './auth';
import branchReducer from './branch';
import classReducer from './class';
import dashboardReducer from './dashboard';
import eventReducer from './event';
import expenseReducer from './expense';
import managerReducer from './manager';
import orderReducer from './order';
import playerReducer from './player';
import redeemReducer from './redeem';
import scheduleReducer from './schedule';
import settingReducer from './setting';
import transactionReducer from './transaction';
import uiReducer from './ui';
import uploadReducer from './upload';
import userReducer from './user';

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  successReducer,
  authReducer,
  branchReducer,
  classReducer,
  dashboardReducer,
  eventReducer,
  expenseReducer,
  managerReducer,
  orderReducer,
  playerReducer,
  redeemReducer,
  scheduleReducer,
  settingReducer,
  transactionReducer,
  uiReducer,
  uploadReducer,
  userReducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
