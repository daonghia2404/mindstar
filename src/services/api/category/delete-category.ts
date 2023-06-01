import ApiService from '@/services/api';

// TYPES

export type TDeleteCategoryPaths = {
  id: string | number;
};
export type TDeleteCategoryParams = unknown;

export type TDeleteCategoryMaterials = {
  paths?: TDeleteCategoryPaths;
  params?: TDeleteCategoryParams;
};

export type TDeleteCategoryResponse = unknown;

// FUNCTION

export const deleteCategory = async ({ paths, params }: TDeleteCategoryMaterials): Promise<TDeleteCategoryResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/categories/${paths?.id}`, { params });
  return response.data;
};
