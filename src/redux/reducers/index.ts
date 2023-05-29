import { combineReducers } from 'redux';

import { loadingReducer, errorReducer, successReducer } from './status';
import authReducer from './auth';
import branchReducer from './branch';
import classReducer from './class';
import dashboardReducer from './dashboard';
import expenseReducer from './expense';
import managerReducer from './manager';
import orderReducer from './order';
import redeemReducer from './redeem';
import scheduleReducer from './schedule';
import settingReducer from './setting';
import timeOffReducer from './time-off';
import transactionReducer from './transaction';
import uiReducer from './ui';
import userReducer from './user';

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  successReducer,
  authReducer,
  branchReducer,
  classReducer,
  dashboardReducer,
  expenseReducer,
  managerReducer,
  orderReducer,
  redeemReducer,
  scheduleReducer,
  settingReducer,
  timeOffReducer,
  transactionReducer,
  uiReducer,
  userReducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
