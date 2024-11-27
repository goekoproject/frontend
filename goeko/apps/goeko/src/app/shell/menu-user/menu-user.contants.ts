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

const COMMON_MENU: MenuUser[] = [
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

const SME_MENU: MenuUser[] = [
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
    title: 'projects',
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
]
const CLEANTECH_MENU: MenuUser[] = [
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
    title: 'leads',
    url: 'leads',
    active: true,
    icon: 'ti ti-access-point',
    userType: [USER_TYPE.CLEANTECH],
  },
]

const BANK_MENU: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: 'dashboard/bank',
    active: true,
    icon: 'home',
    userType: [USER_TYPE.BANK],
  },
  {
    id: window.crypto.randomUUID(),
    title: 'funding',
    url: 'funding',
    active: true,
    icon: 'ti ti-building-bank',
    userType: [USER_TYPE.BANK],
  },
]

const MENU_BY_USER_TYPE = {
  sme: SME_MENU,
  cleantech: CLEANTECH_MENU,
  bank: BANK_MENU,
}
export const getMenuByUserType = (userType: UserType): MenuUser[] => {
  return [...COMMON_MENU, ...MENU_BY_USER_TYPE[userType as keyof typeof MENU_BY_USER_TYPE]]
}
