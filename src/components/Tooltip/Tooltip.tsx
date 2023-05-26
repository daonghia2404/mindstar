import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import classNames from 'classnames';

import { TTooltipProps } from './Tooltip.types';
import './Tooltip.scss';

const Tooltip: React.FC<TTooltipProps> = ({ title, placement, trigger, className, overlayClassName, children }) => {
  return (
    <AntdTooltip
      className={classNames('Tooltip', className)}
      title={title}
      trigger={trigger}
      placement={placement}
      getPopupContainer={(triggerContainer: HTMLElement): HTMLElement => triggerContainer}
      overlayClassName={classNames('Tooltip-overlay', overlayClassName)}
    >
      <div className="Tooltip-wrapper">{children}</div>
    </AntdTooltip>
  );
};

export default Tooltip;
