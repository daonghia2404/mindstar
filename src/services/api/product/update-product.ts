import { TProduct } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateProductPaths = {
  id: string | number;
};
export type TUpdateProductBody = unknown;

export type TUpdateProductMaterials = {
  paths?: TUpdateProductPaths;
  body?: TUpdateProductBody;
};

export type TUpdateProductResponse = TCommonResponse & {
  data: TProduct;
};

// FUNCTION

export const updateProduct = async ({ paths, body }: TUpdateProductMaterials): Promise<TUpdateProductResponse> => {
  const response = await ApiService.patch(`/v1/api/admin/products/${paths?.id}`, body);
  return response.data;
};
