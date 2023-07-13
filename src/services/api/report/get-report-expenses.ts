import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetReportExpensesParams = {
  filterUnit?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetReportExpensesMaterials = {
  params?: TGetReportExpensesParams;
};

export type TExpensePerType = {
  amount: number;
  category_name: string;
  percent: number;
  type: number;
};

export type TExpensePerTime = {
  at_date: number;
  at_month: number;
  at_year: number;
  expense_per_category_list: TExpensePerType[];
};

export type TGetReportExpensesResponse = TCommonResponse & {
  data: {
    total_amount: number;
    expense_per_time_list: TExpensePerTime[];
    expense_per_category_list: TExpensePerType[];
  };
};

// FUNCTION

export const getReportExpenses = async ({
  params,
}: TGetReportExpensesMaterials): Promise<TGetReportExpensesResponse> => {
  const response = await ApiService.get(`/v1/api/expenses/${params?.filterUnit}`, { params });
  return response.data;
};
