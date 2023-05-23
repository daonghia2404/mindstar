import { TDashboard } from '@/common/models';
import { TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetDashboardParams = {
  fromDate?: number;
  toDate?: number;
};

export type TGetDashboardMaterials = {
  params?: TGetDashboardParams;
  headers?: THeaderBranchIds;
};

export type TGetDashboardResponse = TCommonResponse & {
  data: TDashboard;
};

// FUNCTION

export const getDashboard = async ({ params, headers }: TGetDashboardMaterials): Promise<TGetDashboardResponse> => {
  const response = await ApiService.get(`v1/api/admin/dashboard`, { params, headers });
  return response.data;
};
