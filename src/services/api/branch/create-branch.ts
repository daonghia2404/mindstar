import ApiService from '@/services/api';

// TYPES

export type TCreateBranchParams = unknown;
export type TCreateBranchBody = unknown;

export type TCreateBranchMaterials = {
  params?: TCreateBranchParams;
  body?: TCreateBranchBody;
};

export type TCreateBranchResponse = unknown;

// FUNCTION

export const createBranch = async ({ params, body }: TCreateBranchMaterials): Promise<TCreateBranchResponse> => {
  const response = await ApiService.post(`/v1/api/admin/branches`, body, { params });
  return response.data;
};
