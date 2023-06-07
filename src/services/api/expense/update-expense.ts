import ApiService from '@/services/api';

// TYPES

export type TUpdateExpensePaths = {
  id: string | number;
};
export type TUpdateExpenseBody = unknown;

export type TUpdateExpenseMaterials = {
  paths?: TUpdateExpensePaths;
  body?: TUpdateExpenseBody;
};

export type TUpdateExpenseResponse = unknown;

// FUNCTION

export const updateExpense = async ({ paths, body }: TUpdateExpenseMaterials): Promise<TUpdateExpenseResponse> => {
  const response = await ApiService.put(`/v1/api/admin/expenses/${paths?.id}`, body);
  return response.data;
};
