import React from 'react';

import { TIconProps } from './Icon.types';

const Svg: React.FC<TIconProps> = ({ color }) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8.00934L6.84409 11.5357L13.5 4.46387" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Svg;
