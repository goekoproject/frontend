import { ROLES, USER_TYPE, UserRoles, UserType } from '@goeko/store'

export interface MenuUser {
  // RANDOMuuid FORMAT `${string}-${string}-${string}-${string}-${string}`
  id: string
  title: string
  url: string
  active: boolean
  icon?: string
  userType: UserType[]
  userRoles?: UserRoles[]
  submenu?: MenuUser[]
}
export const MENU_USER: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: 'dashboard/sme',
    active: true,
    icon: 'home',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: 'dashboard/cleantech',
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
    title: 'leads',
    url: 'leads',
    active: true,
    icon: 'ti ti-access-point',
    userType: [USER_TYPE.CLEANTECH],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'analysis',
    url: 'projects-list',
    active: true,
    icon: 'ti ti-analyze-filled',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.favourites',
    url: 'favourites',
    active: false,
    icon: 'heart',
    userType: [USER_TYPE.SME],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'Admin',
    url: 'admin',
    active: true,
    icon: 'settings',
    userType: [USER_TYPE.SME],
    userRoles: [ROLES.ADMIN],
    submenu: [
      {
        id: window.crypto.randomUUID(),
        title: 'Category',
        url: 'admin/admin-category',
        active: true,
        userType: [USER_TYPE.SME],
      },
      {
        id: window.crypto.randomUUID(),
        title: 'User',
        url: 'admin/user-data',
        active: true,
        userType: [USER_TYPE.SME],
      },
    ],
  },
]
