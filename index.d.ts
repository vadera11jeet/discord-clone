type UserProfileType = {
  id: string;
  userId: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

type ServerType = {
  id: string;
};

type CheckUserResponseType = {
  user: UserProfileType;
  server: ServerType;
};

type UserGetProfile = {
  data: CheckUserResponseType | null;
  isLoading: bool | null;
  isValidating: bool | null;
  error: Error | unknown | null;
};

type Server = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ApiResponse<T> = {
  [key: string]: T;
  totalCount: number;
  hasMore: boolean;
};
