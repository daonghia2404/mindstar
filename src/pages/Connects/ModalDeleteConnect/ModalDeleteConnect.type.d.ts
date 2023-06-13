import { TMerchant } from '@/common/models';

export type TModalDeleteConnectProps = {
  visible: boolean;
  data?: TMerchant;
  onClose?: () => void;
  onSuccess?: () => void;
};
