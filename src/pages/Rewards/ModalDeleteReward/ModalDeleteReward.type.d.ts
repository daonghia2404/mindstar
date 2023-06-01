import { TReward } from '@/common/models';

export type TModalDeleteRewardProps = {
  visible: boolean;
  data?: TReward;
  onClose?: () => void;
  onSuccess?: () => void;
};
