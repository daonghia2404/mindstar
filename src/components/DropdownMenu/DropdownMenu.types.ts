export type TDropdownMenuProps = {
  className?: string;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  options?: TDropdownMenuItem[];
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
  disabled?: boolean;
  overlayClassName?: string;
  maxHeight?: number;
  visible?: boolean;
  useVisible?: boolean;
  onEnd?: () => void;
  getPopupContainer?: (container: HTMLElement) => HTMLElement;
  onVisibleChange?: (visible: boolean) => void;
  onClickMenuItem?: (data: TDropdownMenuItem) => void;
};

export type TDropdownMenuItem = {
  label: string;
  value: string;
  icon?: string;
  hide?: boolean;
  data?: any;
  danger?: boolean;
  active?: boolean;
  onClick?: (data: TDropdownMenuItem) => void;
};
