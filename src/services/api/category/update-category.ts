import ApiService from '@/services/api';

// TYPES

export type TUpdateCategoryPaths = {
  id: string | number;
};
export type TUpdateCategoryBody = unknown;

export type TUpdateCategoryMaterials = {
  paths?: TUpdateCategoryPaths;
  body?: TUpdateCategoryBody;
};

export type TUpdateCategoryResponse = unknown;

// FUNCTION

export const updateCategory = async ({ paths, body }: TUpdateCategoryMaterials): Promise<TUpdateCategoryResponse> => {
  const response = await ApiService.put(`/v1/api/admin/categories/${paths?.id}`, body);
  return response.data;
};
