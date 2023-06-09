import React from 'react';
import classNames from 'classnames';

import Avatar from '@/components/Avatar';
import Icon, { EIconColor } from '@/components/Icon';

import { TTagsProps } from './Tags.types.d';
import './Tags.scss';

const Tags: React.FC<TTagsProps> = ({ options = [], className, noStyle }) => {
  return (
    <div className={classNames('Tags flex flex-wrap', className, { 'no-style': noStyle })}>
      {options.map((item) => (
        <div
          key={item.value}
          className={classNames('Tags-item flex items-center', { 'onclick': item.onClick }, item.data?.tagType)}
          onClick={(): void => item.onClick?.(item)}
          style={item.data?.style}
        >
          {!['undefined'].includes(typeof item.data?.avatar) && (
            <Avatar size={24} defaultImage={item.data?.defaultImage} image={item.data?.avatar} />
          )}
          {item.data?.iconName && (
            <div className="Tags-item-icon">
              <Icon name={item.data?.iconName} color={item.data?.iconColor || EIconColor.MINE_SHAFT} />
            </div>
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Tags;
