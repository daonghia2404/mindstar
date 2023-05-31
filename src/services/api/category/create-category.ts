import ApiService from '@/services/api';

// TYPES

export type TCreateCategoryParams = unknown;
export type TCreateCategoryBody = unknown;

export type TCreateCategoryMaterials = {
  params?: TCreateCategoryParams;
  body?: TCreateCategoryBody;
};

export type TCreateCategoryResponse = unknown;

// FUNCTION

export const createCategory = async ({ params, body }: TCreateCategoryMaterials): Promise<TCreateCategoryResponse> => {
  const response = await ApiService.post(`/v1/api/admin/categories`, body, { params });
  return response.data;
};
