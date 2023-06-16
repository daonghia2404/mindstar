import { EPriceCardType } from '@/components/PriceCard/PriceCard.enums';
import { TSelectOption } from '@/components/Select';

export type TPriceCardProps = {
  listFeature: TSelectOption[];
  listSetup: TSelectOption[];
  price: string;
  title: string;
  type: EPriceCardType;
  hightlight?: boolean;
};
