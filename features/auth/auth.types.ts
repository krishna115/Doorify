export type UserRole =
  | "admin"
  | "sales"
  | "manufacturer";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  is_active: boolean;
}

export interface LoginResult {
  user: {
    id: string;
    email?: string;
  };

  profile: UserProfile;
}