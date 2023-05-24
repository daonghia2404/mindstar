import React from 'react';
import { Drawer as AntdDrawer } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TDrawerProps } from './Drawer.types.d';
import './Drawer.scss';

const Drawer: React.FC<TDrawerProps> = ({ visible, width = 380, onClose, children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  return (
    <AntdDrawer
      visible={visible}
      width={width}
      onClose={onClose}
      className="Drawer"
      closable={isMobile}
      closeIcon={<Icon name={EIconName.X} color={EIconColor.DOVE_GRAY} />}
    >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
