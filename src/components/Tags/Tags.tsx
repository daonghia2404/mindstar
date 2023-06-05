import React from 'react';
import classNames from 'classnames';

import Avatar from '@/components/Avatar';
import Icon, { EIconColor } from '@/components/Icon';

import { TTagsProps } from './Tags.types.d';
import './Tags.scss';

const Tags: React.FC<TTagsProps> = ({ options = [], className }) => {
  return (
    <div className={classNames('Tags flex flex-wrap', className)}>
      {options.map((item) => (
        <div
          key={item.value}
          className={classNames('Tags-item flex items-center', { 'onclick': item.onClick }, item.data?.tagType)}
          onClick={(): void => item.onClick?.(item)}
        >
          {!['undefined'].includes(typeof item.data?.avatar) && <Avatar size={24} image={item.data?.avatar} />}
          {item.data?.iconName && (
            <div className="Tags-item-icon">
              <Icon name={item.data?.iconName} color={EIconColor.MINE_SHAFT} />
            </div>
          )}
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Tags;
