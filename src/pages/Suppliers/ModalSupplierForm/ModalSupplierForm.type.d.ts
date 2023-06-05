import { TSupplier } from '@/common/models';

export type TModalSupplierFormProps = {
  visible: boolean;
  data?: TSupplier;
  onClose?: () => void;
  onSuccess?: () => void;
};
