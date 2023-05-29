import ApiService from '@/services/api';

// TYPES

export type TCreateClassParams = unknown;
export type TCreateClassBody = unknown;

export type TCreateClassMaterials = {
  params?: TCreateClassParams;
  body?: TCreateClassBody;
};

export type TCreateClassResponse = unknown;

// FUNCTION

export const createClass = async ({ params, body }: TCreateClassMaterials): Promise<TCreateClassResponse> => {
  const response = await ApiService.post(`/v1/api/admin/classes`, body, { params });
  return response.data;
};
