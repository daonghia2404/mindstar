import ApiService from '@/services/api';

// TYPES

export type TDeleteEventPaths = {
  id: string | number;
};
export type TDeleteEventParams = unknown;

export type TDeleteEventMaterials = {
  paths?: TDeleteEventPaths;
  params?: TDeleteEventParams;
};

export type TDeleteEventResponse = unknown;

// FUNCTION

export const deleteEvent = async ({ paths, params }: TDeleteEventMaterials): Promise<TDeleteEventResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/events/${paths?.id}`, { params });
  return response.data;
};
