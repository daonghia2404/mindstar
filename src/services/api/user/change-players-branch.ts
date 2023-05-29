import ApiService from '@/services/api';

// TYPES

export type TChangePlayersBranchBody = unknown;

export type TChangePlayersBranchMaterials = {
  body?: TChangePlayersBranchBody;
};

export type TChangePlayersBranchResponse = unknown;

// FUNCTION

export const changePlayersBranch = async ({
  body,
}: TChangePlayersBranchMaterials): Promise<TChangePlayersBranchResponse> => {
  const response = await ApiService.put(`/v1/api/admin/players/change-branch`, body);
  return response.data;
};
