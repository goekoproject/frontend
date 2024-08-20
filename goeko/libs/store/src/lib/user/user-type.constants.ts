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
    title: 'Enterprise',
    value: USER_TYPE.SME,
    active: true,
    descriptions: 'Je cherche une éco-solution',
  },
  {
    id: 2,
    title: 'USER_TYPE.cleanTech',
    value: USER_TYPE.CLEANTECH,
    active: true,
    descriptions: 'Je propose une éco-solution',
  },
  {
    id: 1,
    title: 'USER_TYPE.bank',
    value: USER_TYPE.Bank,
    active: false,
  },
]
