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
