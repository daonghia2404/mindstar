import { TUploadFile } from '@/common/models';

export type TUploadProps = {
  className?: string;
  value?: any;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  useUploadAPI?: boolean;
  addUrlPrefix?: boolean;
  onUploadSuccess?: (data: TUploadFile[]) => void;
  onChange?: (data: FileList | null) => void;
};
