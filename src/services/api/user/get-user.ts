import ApiService from '@/services/api';

// TYPES

export type TGetUserPaths = {
  id: string | number;
};
export type TGetUserParams = unknown;

export type TGetUserMaterials = {
  paths?: TGetUserPaths;
  params?: TGetUserParams;
};

export type TGetUserResponse = unknown;

// FUNCTION

export const getUser = async ({ paths, params }: TGetUserMaterials): Promise<TGetUserResponse> => {
  const response = await ApiService.get(`/v1/api/admin/users/${paths?.id}`, { params });
  return response.data;
};
