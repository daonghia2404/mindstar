import React from 'react';
import classNames from 'classnames';

import { Link } from '@reach/router';
import Icon, { EIconColor } from '@/components/Icon';

import { TCardProps } from './Card.types.d';
import './Card.scss';

const Card: React.FC<TCardProps> = ({ className, title, description, suffixLink, suffixTitle, children }) => {
  return (
    <div className={classNames('Card', className)}>
      {title && (
        <div className="Card-header flex items-center justify-between">
          <div className="Card-header-item">
            <div className="Card-header-title">{title}</div>
            {description && <div className="Card-header-description">{description}</div>}
          </div>
          <div className="Card-header-item">
            {suffixTitle}
            {suffixLink && (
              <Link to={suffixLink?.link} className="Card-header-suffix-link">
                {suffixLink?.label}
                {suffixLink?.icon && <Icon name={suffixLink.icon} color={EIconColor.PURPLE_HEART} />}
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="Card-body">{children}</div>
    </div>
  );
};

export default Card;
