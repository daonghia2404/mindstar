import ApiService from '@/services/api';

// TYPES

export type TUpdateBusStopPaths = {
  id: string | number;
};
export type TUpdateBusStopBody = unknown;

export type TUpdateBusStopMaterials = {
  paths?: TUpdateBusStopPaths;
  body?: TUpdateBusStopBody;
};

export type TUpdateBusStopResponse = unknown;

// FUNCTION

export const updateBusStop = async ({ paths, body }: TUpdateBusStopMaterials): Promise<TUpdateBusStopResponse> => {
  const response = await ApiService.put(`/v1/api/admin/bus-stops/${paths?.id}`, body);
  return response.data;
};
