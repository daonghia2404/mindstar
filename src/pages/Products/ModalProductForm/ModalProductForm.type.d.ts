import { TProduct } from '@/common/models';

export type TModalProductFormProps = {
  visible: boolean;
  data?: TProduct;
  onClose?: () => void;
  onSuccess?: () => void;
};
