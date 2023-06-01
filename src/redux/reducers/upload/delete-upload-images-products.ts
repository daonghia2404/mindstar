import { TUploadState } from '@/redux/reducers/upload';
import { TDeleteUploadImagesProductsSuccess } from '@/redux/actions/upload';

export const deleteUploadImagesProductsUpdateState = (
  state: TUploadState,
  action: TDeleteUploadImagesProductsSuccess,
): TUploadState => ({
  ...state,
  deleteUploadImagesProductsResponse: action.payload.response,
});
