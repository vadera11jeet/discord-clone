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

type Channel = {
  id: string;
  name: string;
  type: "AUDIO" | "VIDEO" | "TEXT";
  profileId: string;
  serverId: string;
  createdAt: Date;
  updatedAt: Date;
  profile: UserProfileType;
  server: Server;
};

type Member = {
  id: string;
  role: "ADMIN" | "MODERATOR" | "GUEST";
  profileId: string;
  profile: UserProfileType;
  serverId: string;
  server: Server;
  createdAt: Date;
  updatedAt: Date;
};

type ServerInfo = Server & {
  profile: UserProfileType;
  channels: Channel[];
  members: Members[];
};
