import { TProduct } from '@/common/models';

export type TModalDeleteProductProps = {
  visible: boolean;
  data?: TProduct;
  onClose?: () => void;
  onSuccess?: () => void;
};
