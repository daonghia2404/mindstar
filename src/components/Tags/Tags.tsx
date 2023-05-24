import React from 'react';
import classNames from 'classnames';

import Avatar from '@/components/Avatar';
import Icon, { EIconColor } from '@/components/Icon';

import { TTagsProps } from './Tags.types.d';
import './Tags.scss';

const Tags: React.FC<TTagsProps> = ({ options = [] }) => {
  return (
    <div className="Tags flex flex-wrap">
      {options.map((item) => (
        <div
          key={item.value}
          className={classNames('Tags-item flex items-center', { 'onclick': item.onClick })}
          onClick={(): void => item.onClick?.(item)}
        >
          {item.data?.avatar && <Avatar size={24} image={item.data?.avatar} />}
          {item.data?.iconName && (
            <div className="Tags-item-icon">
              <Icon name={item.data?.iconName} color={EIconColor.DOVE_GRAY} />
            </div>
          )}
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Tags;
