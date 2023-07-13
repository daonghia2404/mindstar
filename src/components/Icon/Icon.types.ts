import { CSSProperties } from 'react';

import { EIconName } from '@/components/Icon/Icon.enums';

export type TIconProps = TColor & {
  name?: EIconName;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export type TSvgProps = TColor;

export type TColor = {
  color?: string;
};
