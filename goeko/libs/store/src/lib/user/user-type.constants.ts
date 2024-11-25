export type UserType = 'sme' | 'cleantech'
export enum USER_TYPE {
  SME = 'sme',
  CLEANTECH = 'cleantech',
  Bank = 'bank',
  EMPTY = '',
}

export const USER_TYPE_DESCRIPTION = [
  {
    id: 1,
    title: 'enterprise',
    value: USER_TYPE.SME,
    active: true,
    descriptions: 'SIGNUP.enterpriseDescription',
  },
  {
    id: 2,
    title: 'USER_TYPE.cleanTech',
    value: USER_TYPE.CLEANTECH,
    active: true,
    descriptions: 'SIGNUP.cleantechDescription',
  },
  {
    id: 1,
    title: 'USER_TYPE.bank',
    value: USER_TYPE.Bank,
    active: true,
    descriptions: '',
  },
]
