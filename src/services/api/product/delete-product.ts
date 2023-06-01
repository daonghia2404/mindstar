import ApiService from '@/services/api';

// TYPES

export type TDeleteProductPaths = {
  id: string | number;
};
export type TDeleteProductParams = unknown;

export type TDeleteProductMaterials = {
  paths?: TDeleteProductPaths;
  params?: TDeleteProductParams;
};

export type TDeleteProductResponse = unknown;

// FUNCTION

export const deleteProduct = async ({ paths, params }: TDeleteProductMaterials): Promise<TDeleteProductResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/products/${paths?.id}`, { params });
  return response.data;
};
