import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { TButtonProps } from '@/components/Button';

import { ECategory } from '../constants';

type TButtonStoryProps = Omit<TButtonProps, 'className' | 'onClick'>;

export default {
  title: `${ECategory.COMPONENTS}/Button`,
  component: Button,
  args: {
    title: 'Sample Button',
  },
  argTypes: {
    className: { control: { disable: true } },
    onClick: { control: { disable: true } },
  },
} as Meta;

const TemplatePrimary: Story<TButtonStoryProps> = ({ ...rest }) => <Button {...rest} />;
export const Primary = TemplatePrimary.bind({});
