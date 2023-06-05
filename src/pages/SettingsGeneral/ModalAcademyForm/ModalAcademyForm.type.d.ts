import { TAcademy } from '@/common/models';

export type TModalAcademyFormProps = {
  visible: boolean;
  data?: TAcademy;
  onClose?: () => void;
  onSuccess?: () => void;
};
