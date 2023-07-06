export type TRadioOption = {
  label: React.ReactNode;
  value: any;
  data?: any;
  disabled?: boolean;
};

export type TRadioProps = {
  className?: string;
  value?: TRadioOption;
  options?: TRadioOption[];
  onChange?: (data: TRadioOption) => void;
};
