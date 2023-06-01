import ApiService from '@/services/api';

// TYPES

export type TDeleteUploadImagesProductsPaths = {
  id: string | number;
  productType: string;
  imageIds: string;
};
export type TDeleteUploadImagesProductsParams = unknown;

export type TDeleteUploadImagesProductsMaterials = {
  paths?: TDeleteUploadImagesProductsPaths;
  params?: TDeleteUploadImagesProductsParams;
};

export type TDeleteUploadImagesProductsResponse = unknown;

// FUNCTION

export const deleteUploadImagesProducts = async ({
  paths,
  params,
}: TDeleteUploadImagesProductsMaterials): Promise<TDeleteUploadImagesProductsResponse> => {
  const response = await ApiService.delete(
    `/v1/api/admin/${paths?.productType}/${paths?.id}/images/${paths?.imageIds}`,
    { params },
  );
  return response.data;
};
