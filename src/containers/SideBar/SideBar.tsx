import React from 'react';
import { useSelector } from 'react-redux';
import { Link, navigate, useLocation } from '@reach/router';
import { Collapse } from 'antd';
import classNames from 'classnames';

import { Paths } from '@/pages/routers';
import LogoDark from '@/assets/images/logo-dark.svg';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TRootState } from '@/redux/reducers';

import { dataSideBar } from './SideBar.data';
import { TSideBarProps } from './SideBar.types.d';
import './SideBar.scss';

const { Panel } = Collapse;

const SideBar: React.FC<TSideBarProps> = ({ onCloseMenu }) => {
  const { pathname } = useLocation();
  const settingState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;

  return (
    <div className="SideBar">
      <Link to={Paths.Dashboard} className="SideBar-logo">
        <img src={LogoDark} alt="" />
        <div className="SideBar-logo-version">v{settingState?.common_settings?.web_app_version || '0.0'}</div>
      </Link>

      <Collapse className="SideBar-list" expandIconPosition="right" expandIcon={(): React.ReactNode => <></>}>
        {dataSideBar().map((item) => {
          const isChildren = item.children && item.children?.length > 0;

          return (
            <Panel
              key={item.id}
              collapsible={isChildren ? undefined : 'disabled'}
              header={
                <div
                  className={classNames('SideBar-list-item flex items-center', {
                    active: item.activePaths.includes(pathname),
                  })}
                  onClick={(): void => {
                    if (!isChildren && item.link) {
                      onCloseMenu?.();
                      navigate(item.link);
                    }
                  }}
                >
                  <div className="SideBar-list-item-icon">
                    <Icon name={item.icon as EIconName} color={EIconColor.DOVE_GRAY} />
                  </div>
                  <div className="SideBar-list-item-title">{item.title}</div>
                  {isChildren && (
                    <div className="SideBar-list-item-arrow">
                      <Icon name={EIconName.AngleDown} color={EIconColor.DOVE_GRAY} />
                    </div>
                  )}
                </div>
              }
            >
              {isChildren ? (
                <div className="SideBar-list-children">
                  {item.children?.map((subItem) => (
                    <div
                      className={classNames('SideBar-list-item flex items-center', {
                        active: subItem.activePaths.includes(pathname),
                      })}
                      onClick={(): void => {
                        if (subItem.link) {
                          onCloseMenu?.();
                          navigate(subItem.link);
                        }
                      }}
                    >
                      <div className="SideBar-list-item-icon">
                        <Icon name={subItem.icon as EIconName} color={EIconColor.DOVE_GRAY} />
                      </div>
                      <div className="SideBar-list-item-title">{subItem.title}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default SideBar;
