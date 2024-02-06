import { allRoles } from "./all-roles";

export const allRolesWithoutAdmin = allRoles.filter(
  (role) => role.key !== "admin"
);