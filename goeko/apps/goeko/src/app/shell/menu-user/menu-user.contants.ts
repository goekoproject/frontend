import { ROLES, UserRoles, UserType } from '@goeko/store'

export interface MenuUser {
  // RANDOMuuid FORMAT `${string}-${string}-${string}-${string}-${string}`
  id: string
  title: string
  url: string
  active: boolean
  icon?: string
  userRoles?: UserRoles[]
  order: number
  submenu?: MenuUser[]
}

const COMMON_MENU: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),

    title: 'profile',
    url: 'profile',
    active: true,
    icon: 'user-square-rounded',
    order: 1,
  },
  {
    id: window.crypto.randomUUID(),
    title: 'Admin',
    url: 'admin',
    active: true,
    icon: 'settings',
    userRoles: [ROLES.ADMIN],
    order: 6,
    submenu: [
      {
        id: window.crypto.randomUUID(),
        title: 'Category',
        url: 'admin/grouping',
        active: true,
        order: 1,
      },
      {
        id: window.crypto.randomUUID(),
        title: 'User',
        url: 'admin/user-data',
        active: true,
        order: 2,
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
    order: 0,
  },
  {
    id: window.crypto.randomUUID(),
    title: 'projects',
    url: 'projects-list',
    active: true,
    icon: 'ti ti-analyze-filled',
    order: 2,
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.favourites',
    url: 'favourites',
    active: false,
    icon: 'heart',
    order: 3,
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.funding',
    url: 'funding/matches',
    active: true,
    icon: 'ti ti-building-bank',
    order: 4,
  },
]
const CLEANTECH_MENU: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'Eco-solutions',
    url: 'cleantech-ecosolutions',
    active: true,
    icon: 'solar-panel-2',
    order: 2,
  },

  {
    id: window.crypto.randomUUID(),
    title: 'leads',
    url: 'leads',
    active: true,
    icon: 'ti ti-access-point',
    order: 3,
  },
]

const BANK_MENU: MenuUser[] = [
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER.dashboard',
    url: 'dashboard/bank',
    active: false,
    icon: 'home',
    order: 0,
  },
  {
    id: window.crypto.randomUUID(),
    title: 'MENU_USER_BANK.funding',
    url: 'funding',
    active: true,
    icon: 'ti ti-building-bank',
    order: 2,
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
