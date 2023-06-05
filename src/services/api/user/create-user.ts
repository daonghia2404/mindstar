import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TCreateUserParams = unknown;
export type TCreateUserBody = unknown;

export type TCreateUserMaterials = {
  params?: TCreateUserParams;
  body?: TCreateUserBody;
};

export type TCreateUserResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const createUser = async ({ params, body }: TCreateUserMaterials): Promise<TCreateUserResponse> => {
  const response = await ApiService.post(`/v1/api/admin/users`, body, { params });
  return response.data;
};
