import { UserRole } from "./auth";

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin";

    case "sales":
      return "/sales";

    case "manufacturer":
      return "/manufacturer";

    default:
      return "/login";
  }
}