import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { TAdminProps } from '@/layouts/Admin/Admin.types';
import Header from '@/containers/Header';
import SideBar from '@/containers/SideBar';
import { TRootState } from '@/redux/reducers';
import { getMyProfileAction, getSettingsAction } from '@/redux/actions';
import Helpers from '@/services/helpers';
import { LayoutPaths } from '@/pages/routers';

import './Admin.scss';

const Admin: React.FC<TAdminProps> = ({ children }) => {
  const dispatch = useDispatch();
  const atk = Helpers.getAccessToken();
  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse);
  const settingState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse);
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const getMyProfile = (): void => {
    if (!myProfileState) dispatch(getMyProfileAction.request({}));
  };

  const getSettings = (): void => {
    dispatch(getSettingsAction.request({}));
  };

  useEffect(() => {
    if (atk) {
      getMyProfile();
      getSettings();
    } else {
      navigate(LayoutPaths.Auth);
      Helpers.clearTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return myProfileState && settingState ? (
    <div className="Admin">
      <div className="Admin-header">
        <Header />
      </div>
      <div className="Admin-sidebar">
        <SideBar />
      </div>
      {!['null', 'undefined'].includes(typeof currentBranch?.id) && <div className="Admin-body">{children}</div>}
    </div>
  ) : (
    <></>
  );
};

export default Admin;
