import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetReportRevenuesParams = {
  filterUnit?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetReportRevenuesMaterials = {
  params?: TGetReportRevenuesParams;
};

export type TRevenuePerType = {
  amount: number;
  name: string;
  percent: number;
  type: number;
};

export type TRevenuePerTime = {
  at_date: number;
  at_month: number;
  at_year: number;
  revenue_per_type_list: TRevenuePerType[];
};

export type TGetReportRevenuesResponse = TCommonResponse & {
  data: {
    total_amount: number;
    revenue_per_time_list: TRevenuePerTime[];
    revenue_per_type_list: TRevenuePerType[];
  };
};

// FUNCTION

export const getReportRevenues = async ({
  params,
}: TGetReportRevenuesMaterials): Promise<TGetReportRevenuesResponse> => {
  const response = await ApiService.get(`/v1/api/revenues/${params?.filterUnit}`, { params });
  return response.data;
};
