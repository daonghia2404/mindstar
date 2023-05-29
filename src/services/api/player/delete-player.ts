import ApiService from '@/services/api';

// TYPES

export type TDeletePlayerPaths = {
  id: string | number;
};
export type TDeletePlayerParams = unknown;

export type TDeletePlayerMaterials = {
  paths?: TDeletePlayerPaths;
  params?: TDeletePlayerParams;
};

export type TDeletePlayerResponse = unknown;

// FUNCTION

export const deletePlayer = async ({ paths, params }: TDeletePlayerMaterials): Promise<TDeletePlayerResponse> => {
  const response = await ApiService.delete(`/v1/api/players/${paths?.id}`, { params });
  return response.data;
};
