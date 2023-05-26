import { EUserType } from '@/common/enums';
import ApiService from '@/services/api';

// TYPES

export type TUploadAvatarUserPaths = {
  id: string | number;
  userType: string;
};
export type TUploadAvatarUserParams = unknown;
export type TUploadAvatarUserBody = unknown;

export type TUploadAvatarUserMaterials = {
  paths?: TUploadAvatarUserPaths;
  params?: TUploadAvatarUserParams;
  body?: TUploadAvatarUserBody;
};

export type TUploadAvatarUserResponse = unknown;

// FUNCTION

export const uploadAvatarUser = async ({
  paths,
  params,
  body,
}: TUploadAvatarUserMaterials): Promise<TUploadAvatarUserResponse> => {
  const isPrefixAdmin = [EUserType.MANAGER, EUserType.TEACHER].includes(paths?.userType as EUserType);
  const response = await ApiService.post(
    `/v1/api${isPrefixAdmin ? '/admin' : ''}/${paths?.userType}s/${paths?.id}/upload-avatar`,
    body,
    {
      params,
    },
  );
  return response.data;
};
