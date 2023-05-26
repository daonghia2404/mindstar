import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPlayersParams = {
  page: number;
  size: number;
  name?: string;
  sort?: string;
  classIds?: string;
  auditingStatuses?: string;
};

export type TGetPlayersMaterials = {
  params?: TGetPlayersParams;
  headers?: THeaderBranchIds;
};

export type TGetPlayersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getPlayers = async ({ params, headers }: TGetPlayersMaterials): Promise<TGetPlayersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/players`, { params, headers });
  return response.data;
};
