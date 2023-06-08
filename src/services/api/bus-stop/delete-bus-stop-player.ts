import ApiService from '@/services/api';

// TYPES

export type TDeleteBusStopPlayerPaths = {
  id: string | number;
};
export type TDeleteBusStopPlayerParams = unknown;

export type TDeleteBusStopPlayerMaterials = {
  paths?: TDeleteBusStopPlayerPaths;
  params?: TDeleteBusStopPlayerParams;
};

export type TDeleteBusStopPlayerResponse = unknown;

// FUNCTION

export const deleteBusStopPlayer = async ({
  paths,
  params,
}: TDeleteBusStopPlayerMaterials): Promise<TDeleteBusStopPlayerResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/player-bus-stops/${paths?.id}`, { params });
  return response.data;
};
