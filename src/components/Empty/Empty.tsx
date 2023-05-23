import React from 'react';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TEmptyProps } from './Empty.types.d';
import './Empty.scss';

const Empty: React.FC<TEmptyProps> = () => {
  return (
    <div className="Empty flex flex-col items-center justify-center">
      <Icon name={EIconName.Database} color={EIconColor.DOVE_GRAY} />
      <span>Không có dữ liệu !</span>
    </div>
  );
};

export default Empty;
