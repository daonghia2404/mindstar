import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateUserPaths = {
  id: string | number;
};
export type TUpdateUserBody = unknown;

export type TUpdateUserMaterials = {
  useAdmin?: boolean;
  paths?: TUpdateUserPaths;
  body?: TUpdateUserBody;
};

export type TUpdateUserResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const updateUser = async ({
  paths,
  body,
  useAdmin = true,
}: TUpdateUserMaterials): Promise<TUpdateUserResponse> => {
  const response = await ApiService.put(`/v1/api${useAdmin ? '/admin' : ''}/users/${paths?.id}`, body);
  return response.data;
};
