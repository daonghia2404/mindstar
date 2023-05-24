import React, { ChangeEvent } from 'react';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { TFormFieldProps } from '@/components/FormField';

export type TTextAreaProps = TFormFieldProps & {
  className?: string;
  placeholder?: string;
  value?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: SizeType;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
