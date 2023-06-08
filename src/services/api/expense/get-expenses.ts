import { TExpense } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetExpensesParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
  search?: string;
  sort?: string;
  categoryIds?: string;
  paymentTypes?: string;
};

export type TGetExpensesMaterials = {
  params?: TGetExpensesParams;
  headers?: THeaderBranchIds;
};

export type TGetExpensesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TExpense[];
    sub_total: number;
  };
};

// FUNCTION

export const getExpenses = async ({ params, headers }: TGetExpensesMaterials): Promise<TGetExpensesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/expenses`, { params, headers });
  return response.data;
};
