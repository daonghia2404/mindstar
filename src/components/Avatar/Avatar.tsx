import React, { useEffect, useState } from 'react';
import { Avatar as AntdAvatar } from 'antd';
import classNames from 'classnames';

import ImageAvatarDefault from '@/assets/images/image-avatar-default.png';
import ImageDefault from '@/assets/images/image-placeholder.png';

import { TAvatarProps } from './Avatar.types';
import './Avatar.scss';

const Avatar: React.FC<TAvatarProps> = ({ image, shape, size, className, defaultImage }) => {
  const [isError, setIsError] = useState(false);
  const defaultImagePlaceholder = defaultImage ? ImageDefault : ImageAvatarDefault;

  useEffect(() => {
    setIsError(false);
  }, [image]);

  return (
    <div className={classNames('Avatar', className)}>
      <AntdAvatar
        size={size}
        shape={shape}
        src={isError ? defaultImagePlaceholder : image || defaultImagePlaceholder}
        onError={(): boolean => {
          setIsError(true);
          return true;
        }}
      />
    </div>
  );
};

export default Avatar;
