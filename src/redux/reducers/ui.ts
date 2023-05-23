import { createReducer } from 'deox';
import { uiActions } from '@/redux/actions';
import { TBranch } from '@/common/models';

export enum EDeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export type TInitialState = {
  device: {
    type: EDeviceType;
    width: number;
  };
  branch?: TBranch;
};

const initialState: TInitialState = {
  device: {
    type: window.innerWidth > 991 ? EDeviceType.DESKTOP : EDeviceType.MOBILE,
    width: window.innerWidth,
  },
  branch: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(uiActions.setDevice, (state, { payload }) => ({
    ...state,
    device: {
      type: payload.deviceWidth > 991 ? EDeviceType.DESKTOP : EDeviceType.MOBILE,
      width: payload.deviceWidth,
    },
  })),
  handleAction(uiActions.setCommonBranch, (state, { payload }) => ({
    ...state,
    branch: payload,
  })),
]);

export default reducer;
