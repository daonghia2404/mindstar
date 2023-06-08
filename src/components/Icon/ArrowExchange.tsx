import React from 'react';

import { TIconProps } from './Icon.types';

const Svg: React.FC<TIconProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrows-exchange"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 10h14l-4 -4" />
      <path d="M17 14h-14l4 4" />
    </svg>
  );
};

export default Svg;
