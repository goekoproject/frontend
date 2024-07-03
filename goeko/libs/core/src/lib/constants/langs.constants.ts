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
  /* 		{
        code: 'es',
        locale: 'es ',
    }, */
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
