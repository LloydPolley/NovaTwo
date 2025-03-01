export type UserListType = {
  users: UserType[];
};

export type UserType = {
  id: string;
  artist: string;
  email: string;
  artwork: string;
  createdAt: Date;
};
