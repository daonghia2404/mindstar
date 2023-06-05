import { TSupplier } from '@/common/models';

export type TModalDeleteSupplierProps = {
  visible: boolean;
  data?: TSupplier;
  onClose?: () => void;
  onSuccess?: () => void;
};
