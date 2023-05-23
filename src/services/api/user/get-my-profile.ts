import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetMyProfileParams = unknown;

export type TGetMyProfileMaterials = {
  params?: TGetMyProfileParams;
};

export type TGetMyProfileResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const getMyProfile = async ({ params }: TGetMyProfileMaterials): Promise<TGetMyProfileResponse> => {
  const response = await ApiService.get(`/v1/api/users/my-profile`, { params });
  return response.data;
};
