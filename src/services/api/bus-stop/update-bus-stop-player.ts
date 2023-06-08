import ApiService from '@/services/api';

// TYPES

export type TUpdateBusStopPlayerPaths = {
  id: string | number;
};
export type TUpdateBusStopPlayerBody = unknown;

export type TUpdateBusStopPlayerMaterials = {
  paths?: TUpdateBusStopPlayerPaths;
  body?: TUpdateBusStopPlayerBody;
};

export type TUpdateBusStopPlayerResponse = unknown;

// FUNCTION

export const updateBusStopPlayer = async ({
  paths,
  body,
}: TUpdateBusStopPlayerMaterials): Promise<TUpdateBusStopPlayerResponse> => {
  const response = await ApiService.put(`/v1/api/admin/player-bus-stops/${paths?.id}`, body);
  return response.data;
};
