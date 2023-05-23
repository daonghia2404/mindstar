import { ButtonType } from 'antd/lib/button';
import { ButtonHTMLType } from 'antd/lib/button/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { CSSProperties } from 'react';

import { EIconColor, EIconName } from '@/components/Icon';
import { EButtonStyleType } from '@/components/Button/Button.enums';

export type TButtonProps = {
  className?: string;
  title?: string;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
  size?: SizeType;
  shadow?: boolean;
  iconName?: EIconName;
  danger?: boolean;
  link?: string;
  iconColor?: EIconColor;
  reverse?: boolean;
  styleType?: EButtonStyleType;
  disabled?: boolean;
  loading?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
};
