import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPlayerPaths = {
  id: string | number;
};
export type TGetPlayerParams = unknown;

export type TGetPlayerMaterials = {
  paths?: TGetPlayerPaths;
  params?: TGetPlayerParams;
};

export type TGetPlayerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const getPlayer = async ({ paths, params }: TGetPlayerMaterials): Promise<TGetPlayerResponse> => {
  const response = await ApiService.get(`/v1/api/players/${paths?.id}`, { params });
  return response.data;
};
