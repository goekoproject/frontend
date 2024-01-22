export enum ROLES {
  PUBLIC = 'public',
  ADMIN = 'administrator',
}
export type UserRoles = ROLES.PUBLIC | ROLES.ADMIN;
