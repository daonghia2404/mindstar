import { TProduct } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TCreateProductParams = unknown;
export type TCreateProductBody = unknown;

export type TCreateProductMaterials = {
  params?: TCreateProductParams;
  body?: TCreateProductBody;
};

export type TCreateProductResponse = TCommonResponse & {
  data: TProduct;
};

// FUNCTION

export const createProduct = async ({ params, body }: TCreateProductMaterials): Promise<TCreateProductResponse> => {
  const response = await ApiService.post(`/v1/api/admin/products`, body, { params });
  return response.data;
};
