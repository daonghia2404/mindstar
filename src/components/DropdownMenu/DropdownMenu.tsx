import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import WrapperLazyLoad from '@/components/WrapperLazyLoad';

import { TDropdownMenuProps } from './DropdownMenu.types';
import './DropdownMenu.scss';

const DropdownMenu: React.FC<TDropdownMenuProps> = ({
  children,
  trigger,
  placement,
  overlayClassName,
  options = [],
  disabled,
  visible,
  useVisible,
  maxHeight,
  onEnd,
  getPopupContainer,
  onClickMenuItem,
  onVisibleChange,
}) => {
  const handleVisibleChange = (currentVisible: boolean): void => {
    onVisibleChange?.(currentVisible);
  };

  const props = {
    placement,
    disabled,
    overlayClassName: classNames('DropdownMenu-overlay', overlayClassName),
    trigger: trigger || ['click'],
    getPopupContainer,
    onVisibleChange: handleVisibleChange,
  };

  const antdDropdownProps = useVisible
    ? {
        visible,
        ...props,
      }
    : props;

  const renderDropdownMenuOverlay = (): React.ReactElement => {
    return (
      <div className="DropdownMenu-list">
        {options
          .filter((item) => !item.hide)
          .map((item) => (
            <div
              key={item.value}
              className={classNames('DropdownMenu-list-item flex items-center', {
                danger: item.danger,
                active: item.active,
              })}
              onClick={(): void => {
                item.onClick?.(item);
                onClickMenuItem?.(item);
              }}
            >
              {item.icon && (
                <div className="DropdownMenu-list-item-icon">
                  <Icon name={item.icon as EIconName} color={EIconColor.DOVE_GRAY} />
                </div>
              )}
              <div className="DropdownMenu-list-item-title">{item.label}</div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="DropdownMenu">
      <AntdDropdown
        {...antdDropdownProps}
        overlay={
          maxHeight ? (
            <WrapperLazyLoad maxHeight={maxHeight} onEnd={onEnd}>
              {renderDropdownMenuOverlay()}
            </WrapperLazyLoad>
          ) : (
            renderDropdownMenuOverlay()
          )
        }
      >
        <div className="DropdownMenu-wrapper">{children}</div>
      </AntdDropdown>
    </div>
  );
};

export default DropdownMenu;
