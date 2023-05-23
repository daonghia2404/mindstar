import { TBranch } from '@/common/models';
import { EUIAction } from './constants';

export type TSetDevice = { type: EUIAction.SET_DEVICE; payload: { deviceWidth: number } };
export type TSetCommonBranch = { type: EUIAction.SET_COMMON_BRANCH; payload: TBranch };
export type TResetActionStatus = { type: EUIAction.RESET_ACTION_STATUS };
