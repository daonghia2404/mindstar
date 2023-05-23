import React from 'react';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TDashboardStaticCardProps } from './DashboardStaticCard.types';
import './DashboardStaticCard.scss';

const DashboardStaticCard: React.FC<TDashboardStaticCardProps> = ({ title, value, icon }) => {
  return (
    <div className="DashboardStaticCard">
      <div className="DashboardStaticCard-wrapper">
        <div className="DashboardStaticCard-icon">
          <Icon name={icon as EIconName} color={EIconColor.WHITE} />
        </div>
        <div className="DashboardStaticCard-title">{title}</div>
        <div className="DashboardStaticCard-value">{value}</div>
      </div>
    </div>
  );
};

export default DashboardStaticCard;
