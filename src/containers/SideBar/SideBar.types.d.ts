export type TSideBarProps = {
  onCloseMenu?: () => void;
};

export type TSideBarData = {
  id: string;
  title: string;
  link?: string;
  activePaths: string[];
  icon?: string;
  children?: TSideBarData[];
};
