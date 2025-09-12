export type User = {
  id: string;
  name: string;
  profileImage: string;
};

export type SelectedUser = User | null;

export type Message = {
  id: string;
  text: string;
  timestamp: Date;
};

export type Conversations = Record<string, Message[]>;
