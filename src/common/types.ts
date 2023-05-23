export type TCommonResponse = {
  message: string;
  success: boolean;
};

export type TCommonPaginate = {
  page: number;
  size: number;
  total_elements: number;
};

export type THeaderBranchIds = {
  branchIds: string | number | undefined;
};
