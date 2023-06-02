import { TRedeem } from '@/common/models';

export type TModalRedeemFormProps = {
  visible: boolean;
  data?: TRedeem;
  onClose?: () => void;
  onSuccess?: () => void;
};
