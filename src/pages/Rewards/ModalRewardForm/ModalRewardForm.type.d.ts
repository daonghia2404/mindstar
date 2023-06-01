import { TReward } from '@/common/models';

export type TModalRewardFormProps = {
  visible: boolean;
  data?: TReward;
  onClose?: () => void;
  onSuccess?: () => void;
};
