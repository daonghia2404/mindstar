import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

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
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

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

  const handleOpenMenu = (): void => {
    setVisibleMenu(true);
  };

  const handleCloseMenu = (): void => {
    setVisibleMenu(false);
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

  useEffect(() => {
    setVisibleMenu(false);
  }, [isMobile]);

  return myProfileState && settingState ? (
    <div className={classNames('Admin', { 'visible-menu': isMobile && visibleMenu })}>
      <div className="Admin-header">
        <Header onOpenMenu={handleOpenMenu} />
      </div>
      <div className="Admin-sidebar">
        <SideBar onCloseMenu={handleCloseMenu} />
      </div>
      {isMobile && <div className="Admin-sidebar-overlay" onClick={handleCloseMenu} />}
      {!['null', 'undefined'].includes(typeof currentBranch?.id) && <div className="Admin-body">{children}</div>}
    </div>
  ) : (
    <></>
  );
};

export default Admin;
