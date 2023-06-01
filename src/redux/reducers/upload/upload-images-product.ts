import { TUploadState } from '@/redux/reducers/upload';
import { TUploadImagesProductSuccess } from '@/redux/actions/upload';

export const uploadImagesProductUpdateState = (
  state: TUploadState,
  action: TUploadImagesProductSuccess,
): TUploadState => ({
  ...state,
  uploadImagesProductResponse: action.payload.response,
});
