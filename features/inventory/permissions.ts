import { UserRole } from "../auth";

export const InventoryPermissions = {
  canView(role: UserRole) {
    return [
      "admin",
      "sales",
      "manufacturer",
    ].includes(role);
  },

  canUpdate(role: UserRole) {
    return role === "admin";
  },

  canCreate(role: UserRole) {
    return role === "admin";
  },

  canDelete(role: UserRole) {
    return role === "admin";
  },
};