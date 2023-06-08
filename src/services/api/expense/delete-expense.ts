import ApiService from '@/services/api';

// TYPES

export type TDeleteExpensePaths = {
  id: string | number;
};
export type TDeleteExpenseParams = unknown;

export type TDeleteExpenseMaterials = {
  paths?: TDeleteExpensePaths;
  params?: TDeleteExpenseParams;
};

export type TDeleteExpenseResponse = unknown;

// FUNCTION

export const deleteExpense = async ({ paths, params }: TDeleteExpenseMaterials): Promise<TDeleteExpenseResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/expenses/${paths?.id}`, { params });
  return response.data;
};
