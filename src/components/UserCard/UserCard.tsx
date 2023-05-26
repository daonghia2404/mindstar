import React from 'react';

import Avatar from '@/components/Avatar';

import { TUserCardProps } from './UserCard.types.d';
import './UserCard.scss';

const UserCard: React.FC<TUserCardProps> = ({ avatar, title, description, onClick }) => {
  return (
    <div className="UserCard">
      <div className="UserCard-avatar" onClick={onClick}>
        <Avatar size={70} image={avatar} />
      </div>
      <div className="UserCard-info">
        {title && (
          <div className="UserCard-info-title" onClick={onClick}>
            {title}
          </div>
        )}
        {description && <div className="UserCard-info-description">{description}</div>}
      </div>
    </div>
  );
};

export default UserCard;
