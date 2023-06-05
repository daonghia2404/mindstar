import ApiService from '@/services/api';

// TYPES

export type TDeleteUserPaths = {
  id: string | number;
};
export type TDeleteUserParams = unknown;

export type TDeleteUserMaterials = {
  paths?: TDeleteUserPaths;
  params?: TDeleteUserParams;
};

export type TDeleteUserResponse = unknown;

// FUNCTION

export const deleteUser = async ({ paths, params }: TDeleteUserMaterials): Promise<TDeleteUserResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/users/${paths?.id}`, { params });
  return response.data;
};
