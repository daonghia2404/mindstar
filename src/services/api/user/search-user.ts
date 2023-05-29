import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TSearchUserParams = {
  userName?: string;
};

export type TSearchUserMaterials = {
  params?: TSearchUserParams;
};

export type TSearchUserResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const searchUser = async ({ params }: TSearchUserMaterials): Promise<TSearchUserResponse> => {
  const response = await ApiService.get(`/v1/api/users`, { params });
  return response.data;
};
