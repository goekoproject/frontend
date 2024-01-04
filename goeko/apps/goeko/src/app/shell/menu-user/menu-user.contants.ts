import { ROLES, UserRoles } from '@goeko/core';
import { USER_TYPE, UserType } from '@goeko/store';

export interface MenuUser {
  // RANDOMuuid FORMAT `${string}-${string}-${string}-${string}-${string}`
  id: string;
  title: string;
  url: string;
  active: boolean;
  icon: string;
  userType: UserType[];
  userRoles?: UserRoles[];
}
export const MENU_USER: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: '/dashboard/sme',
    active: true,
    icon: 'home',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: '/dashboard/cleantech',
    active: true,
    icon: 'home',
    userType: [USER_TYPE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'Eco-solutions',
    url: 'cleantech-ecosolutions',
    active: true,
    icon: 'solar-panel-2',
    userType: [USER_TYPE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),

    title: 'profile',
    url: 'profile',
    active: true,
    icon: 'user-square-rounded',
    userType: [USER_TYPE.SME, USER_TYPE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'analysis',
    url: 'sme-analysis/new',
    active: true,
    icon: 'ti ti-analyze-filled',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.favorites',
    url: 'favorite',
    active: true,
    icon: 'heart',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'Admin Category',
    url: 'admin',
    active: true,
    icon: 'settings',
    userType: [USER_TYPE.SME],
    userRoles: [ROLES.ADMIN],
  },
];
