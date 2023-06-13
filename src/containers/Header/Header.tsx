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
import ImageMenuBar from '@/assets/images/image-menu-bar.png';
import { TSideBarData } from '@/containers/SideBar';

import { THeaderProps } from './Header.types.d';
import './Header.scss';

const Header: React.FC<THeaderProps> = ({ onOpenMenu }) => {
  const { pathname } = useLocation();
  const [modalLogoutState, setModalLogoutState] = useState<{ visible: boolean }>({ visible: false });
  const dataLocation = {
    id: [...pathname.split('/')].pop(),
  };

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

  const handleCloseModalLogout = (): void => {
    setModalLogoutState({ visible: false });
  };
  const handleOpenModalLogout = (): void => {
    setModalLogoutState({ visible: true });
  };

  const renderHeaderTitle = (): string => {
    const arrSidebarItem: TSideBarData[] = [];

    const parseDataSidebar = (data: TSideBarData[]): void => {
      data.forEach((item) => {
        const isChildren = item.children && item.children.length > 0;
        if (isChildren) parseDataSidebar(item.children as TSideBarData[]);
        else arrSidebarItem.push(item);
      });
    };

    parseDataSidebar(dataSideBar(dataLocation));

    const sideBarItem = arrSidebarItem.find((item) => item?.link === pathname);

    return sideBarItem?.headerTitle || sideBarItem?.title || 'MindStar';
  };

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
        <div className="Header-item flex items-center">
          <div className="Header-menu" onClick={onOpenMenu}>
            <img src={ImageMenuBar} alt="" />
          </div>

          <div className="Header-title nowrap">{renderHeaderTitle()}</div>
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
