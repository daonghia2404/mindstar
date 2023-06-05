import { ETypeProductUploadImages } from '@/common/enums';
import ApiService from '@/services/api';

// TYPES

export type TUploadImagesProductPaths = {
  id: string | number;
  productType: string;
};
export type TUploadImagesProductParams = unknown;
export type TUploadImagesProductBody = unknown;

export type TUploadImagesProductMaterials = {
  paths?: TUploadImagesProductPaths;
  params?: TUploadImagesProductParams;
  body?: TUploadImagesProductBody;
};

export type TUploadImagesProductResponse = unknown;

// FUNCTION

export const uploadImagesProduct = async ({
  paths,
  params,
  body,
}: TUploadImagesProductMaterials): Promise<TUploadImagesProductResponse> => {
  const showSuffix = [ETypeProductUploadImages.PRODUCTS, ETypeProductUploadImages.REWARDS].includes(
    paths?.productType as ETypeProductUploadImages,
  );

  const response = await ApiService.post(
    `/v1/api/admin/${paths?.productType}/${paths?.id}/upload${showSuffix ? '-images' : ''}`,
    body,
    {
      params,
    },
  );
  return response.data;
};
