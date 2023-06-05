import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdatePlayerPaths = {
  id: string | number;
};
export type TUpdatePlayerBody = unknown;

export type TUpdatePlayerMaterials = {
  paths?: TUpdatePlayerPaths;
  body?: TUpdatePlayerBody;
};

export type TUpdatePlayerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const updatePlayer = async ({ paths, body }: TUpdatePlayerMaterials): Promise<TUpdatePlayerResponse> => {
  const response = await ApiService.put(`/v1/api/players/${paths?.id}`, body);
  return response.data;
};
