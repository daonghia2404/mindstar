import { TBusStop } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetBusStopsParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
};

export type TGetBusStopsMaterials = {
  params?: TGetBusStopsParams;
  headers?: THeaderBranchIds;
};

export type TGetBusStopsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TBusStop[];
  };
};

// FUNCTION

export const getBusStops = async ({ params, headers }: TGetBusStopsMaterials): Promise<TGetBusStopsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/bus-stops`, { params, headers });
  return response.data;
};
