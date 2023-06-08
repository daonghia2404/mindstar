export type TSideBarProps = {
  onCloseMenu?: () => void;
};

export type TSideBarData = {
  id: string;
  title: string;
  link?: string;
  activePaths: string[];
  hide?: boolean;
  headerTitle?: string;
  icon?: string;
  children?: TSideBarData[];
};
