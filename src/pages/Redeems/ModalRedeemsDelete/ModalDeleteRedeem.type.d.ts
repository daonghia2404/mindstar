import { TRedeem } from '@/common/models';

export type TModalDeleteRedeemProps = {
  visible: boolean;
  data?: TRedeem;
  onClose?: () => void;
  onSuccess?: () => void;
};
