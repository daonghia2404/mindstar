import { TooltipPlacement } from 'antd/lib/tooltip';

export type TTooltipProps = {
  className?: string;
  trigger?: string | string[];
  title: string;
  overlayClassName?: string;
  placement?: TooltipPlacement;
};
