import React, { CSSProperties } from 'react';

export type TDropdownCustomProps = {
  className?: string;
  noUseVisible?: boolean;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement;
  overlayStyle?: CSSProperties;
  visible?: boolean;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
  overlayClassName?: string;
  disabled?: boolean;
  getPopupContainer?: (container: HTMLElement) => HTMLElement;
  onVisibleChange?: (visible: boolean) => void;
};
