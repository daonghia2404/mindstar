import { TEvent } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetEventsParams = {
  page: number;
  size: number;
  title?: string;
  auditingStatuses?: string;
  sort?: string;
};

export type TGetEventsMaterials = {
  params?: TGetEventsParams;
  headers?: THeaderBranchIds;
};

export type TGetEventsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TEvent[];
  };
};

// FUNCTION

export const getEvents = async ({ params, headers }: TGetEventsMaterials): Promise<TGetEventsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/events`, { params, headers });
  return response.data;
};
