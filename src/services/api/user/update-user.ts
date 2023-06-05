import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateUserPaths = {
  id: string | number;
};
export type TUpdateUserBody = unknown;

export type TUpdateUserMaterials = {
  paths?: TUpdateUserPaths;
  body?: TUpdateUserBody;
};

export type TUpdateUserResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const updateUser = async ({ paths, body }: TUpdateUserMaterials): Promise<TUpdateUserResponse> => {
  const response = await ApiService.put(`/v1/api/admin/users/${paths?.id}`, body);
  return response.data;
};
