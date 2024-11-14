export interface Lang {
  codeContentFul: CODE_LANG
  code: CODE_LANG
  title: string
  iconFlag?: ICON_FLAG
}

export enum CODE_LANG {
  ES = 'es',
  FR = 'fr',
  EN = 'en',
  GB = 'gb',
  //DE = 'de'
}
export enum ICON_FLAG {
  ES = 'es',
  FR = 'fr',
  GB = 'gb',
  //DE = 'de'
}
export const LANGS: Lang[] = [
  {
    codeContentFul: CODE_LANG.ES,
    title: 'LANGS.es',
    code: CODE_LANG.ES,
    iconFlag: ICON_FLAG.ES,
  },
  {
    codeContentFul: CODE_LANG.FR,
    title: 'LANGS.fr',
    code: CODE_LANG.FR,
    iconFlag: ICON_FLAG.FR,
  },
  {
    codeContentFul: CODE_LANG.GB,
    title: 'LANGS.gb',
    code: CODE_LANG.EN,
    iconFlag: ICON_FLAG.GB,
  },
  /*{
    codeContentFul: CODE_LANG.DE,
    title: 'LANGS.de',
    code: CODE_LANG.DE,
    iconFlag:ICON_FLAG.DE
  },*/
]
