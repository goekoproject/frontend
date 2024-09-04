export interface Lang {
  codeContentFul: string
  code: string
  title: string
}

export enum CODE_LANG {
  ES = 'es',
  FR = 'fr',
  EN = 'en',
  GB = 'gb',
}
export const LANGS: Lang[] = [

  {
    codeContentFul: CODE_LANG.ES,
    title: 'LANGS.es',
    code: CODE_LANG.ES,
  },
  {
    codeContentFul: CODE_LANG.FR,
    title: 'LANGS.fr',
    code: CODE_LANG.FR,
  },
  {
    codeContentFul: CODE_LANG.GB,
    title: 'LANGS.gb',
    code: CODE_LANG.EN,
  },
]
