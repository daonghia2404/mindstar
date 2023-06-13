import { TMerchantFeed } from '@/common/models';

export type TModalChangeStatusMerchantFeedProps = {
  visible: boolean;
  data?: TMerchantFeed;
  checked?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};
