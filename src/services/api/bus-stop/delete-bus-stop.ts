import ApiService from '@/services/api';

// TYPES

export type TDeleteBusStopPaths = {
  id: string | number;
};
export type TDeleteBusStopParams = unknown;

export type TDeleteBusStopMaterials = {
  paths?: TDeleteBusStopPaths;
  params?: TDeleteBusStopParams;
};

export type TDeleteBusStopResponse = unknown;

// FUNCTION

export const deleteBusStop = async ({ paths, params }: TDeleteBusStopMaterials): Promise<TDeleteBusStopResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/bus-stops/${paths?.id}`, { params });
  return response.data;
};
