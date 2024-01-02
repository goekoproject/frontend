import { ROLE, Role } from '@goeko/core';

export interface MenuUser {
  // RANDOMuuid FORMAT `${string}-${string}-${string}-${string}-${string}`
  id: string;
  title: string;
  url: string;
  active: boolean;
  icon: string;
  roles: Role[];
}
export const MENU_USER: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: '/dashboard/sme',
    active: true,
    icon: 'home',
    roles: [ROLE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: '/dashboard/cleantech',
    active: true,
    icon: 'home',
    roles: [ROLE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'Eco-solutions',
    url: 'cleantech-ecosolutions',
    active: true,
    icon: 'solar-panel-2',
    roles: [ROLE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),

    title: 'profile',
    url: 'profile',
    active: true,
    icon: 'user-square-rounded',
    roles: [ROLE.SME, ROLE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'analysis',
    url: 'sme-analysis/new',
    active: true,
    icon: 'ti ti-analyze-filled',
    roles: [ROLE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.favorites',
    url: 'favorite',
    active: true,
    icon: 'heart',
    roles: [ROLE.SME],
  },
];
