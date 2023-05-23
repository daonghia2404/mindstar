import { createActionCreator } from 'deox';

import { EUIAction } from './constants';
import { TResetActionStatus, TSetCommonBranch, TSetDevice } from './types';
import { TBranch } from '@/common/models';

export const uiActions = {
  setDevice: createActionCreator(
    EUIAction.SET_DEVICE,
    (resolve) =>
      (deviceWidth: number): TSetDevice =>
        resolve({ deviceWidth }),
  ),
  setCommonBranch: createActionCreator(
    EUIAction.SET_COMMON_BRANCH,
    (resolve) =>
      (data?: TBranch): TSetCommonBranch =>
        resolve(data),
  ),
  resetActionStatus: createActionCreator(
    EUIAction.RESET_ACTION_STATUS,
    (resolve) =>
      (actionName: string): TResetActionStatus =>
        resolve({ actionName: actionName.replace('_REQUEST', '') }),
  ),
};
