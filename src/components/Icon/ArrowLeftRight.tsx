import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from '@/components/Icon/Icon.enums';

const Svg: React.FC<TIconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrows-sort"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: 'rotate(90deg)' }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke={EIconColor.APPLE} d="M3 9l4 -4l4 4m-4 -4v14" />
      <path stroke={EIconColor.POMEGRANATE} d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );
};

export default Svg;
