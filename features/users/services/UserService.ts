import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types";

export class UserService {
  static async getAll(): Promise<User[]> {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    return response.json();
  }

  static async create(
    request: CreateUserRequest
  ) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  static async update(
    request: UpdateUserRequest
  ) {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  static async delete(id: string) {
    const response = await fetch(`/api/users?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }
}