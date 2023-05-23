import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from '@reach/router';

import Avatar from '@/components/Avatar';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import DropdownMenu from '@/components/DropdownMenu';
import { dataSideBar } from '@/containers/SideBar/SideBar.data';
import ModalLogout from '@/containers/Header/ModalLogout';
import { TRootState } from '@/redux/reducers';
import { getFullUrlStatics } from '@/utils/functions';
import MainBranchSelect from '@/containers/Header/MainBranchSelect';

import { THeaderProps } from './Header.types.d';
import './Header.scss';

const Header: React.FC<THeaderProps> = () => {
  const { pathname } = useLocation();
  const [modalLogoutState, setModalLogoutState] = useState<{ visible: boolean }>({ visible: false });

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

  const handleCloseModalLogout = (): void => {
    setModalLogoutState({ visible: false });
  };
  const handleOpenModalLogout = (): void => {
    setModalLogoutState({ visible: true });
  };

  const headerTitle =
    [
      ...dataSideBar().filter((item) => !item.children || item.children.length === 0),
      ...dataSideBar()
        .map((item) => item.children)
        .flat(),
    ].find((item) => item?.activePaths.includes(pathname))?.title || 'MindStar';

  const dataAccountDropdownMenu = [
    {
      value: 'profile',
      label: 'Thông tin cá nhân',
      icon: EIconName.AddressBook,
      onClick: (): void => {},
    },
    {
      value: 'logout',
      label: 'Đăng xuất',
      danger: true,
      icon: EIconName.Logout,
      onClick: (): void => {
        handleOpenModalLogout();
      },
    },
  ];

  return (
    <div className="Header">
      <div className="Header-wrapper flex items-center justify-between">
        <div className="Header-item">
          <div className="Header-title">{headerTitle}</div>
        </div>
        <div className="Header-item flex items-center">
          <MainBranchSelect />
          <DropdownMenu options={dataAccountDropdownMenu} placement="bottomRight">
            <div className="Header-account flex items-center">
              <Avatar size={32} image={getFullUrlStatics(myProfileState?.avatar)} />
              <div className="Header-account-title">{myProfileState?.name}</div>
              <div className="Header-account-arrow">
                <Icon name={EIconName.AngleDown} color={EIconColor.MINE_SHAFT} />
              </div>
            </div>
          </DropdownMenu>
        </div>
      </div>

      <ModalLogout {...modalLogoutState} onClose={handleCloseModalLogout} />
    </div>
  );
};

export default Header;
