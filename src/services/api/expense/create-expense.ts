import ApiService from '@/services/api';

// TYPES

export type TCreateExpenseParams = unknown;
export type TCreateExpenseBody = unknown;

export type TCreateExpenseMaterials = {
  params?: TCreateExpenseParams;
  body?: TCreateExpenseBody;
};

export type TCreateExpenseResponse = unknown;

// FUNCTION

export const createExpense = async ({ params, body }: TCreateExpenseMaterials): Promise<TCreateExpenseResponse> => {
  const response = await ApiService.post(`/v1/api/admin/expenses`, body, { params });
  return response.data;
};
