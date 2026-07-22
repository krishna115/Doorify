export type UserRole =
  | "admin"
  | "sales"
  | "manufacturer";

export interface User {
  id: string;

  name: string;

  email: string;

  role: UserRole;

  created_at: string;
}

export interface CreateUserRequest {
  name: string;

  email: string;

  password: string;

  role: UserRole;
}

export interface UpdateUserRequest {
  id: string;

  name: string;

  email: string;

  role: UserRole;

  password?: string;
}