import { IMenu } from './menu.interface';

export const MENU: IMenu[] = [
  {
    id: window.crypto.randomUUID(),
    code: 'about',
    keyLang: 'MENU.aboutGoEKo',
    url: 'home/about',
    type: 'text',
  },
  {
    id: window.crypto.randomUUID(),
    code: 'blog',
    keyLang: 'MENU.blog',
    url: 'administration',
    type: 'text',
  },
  {
    id: window.crypto.randomUUID(),
    code: 'contact',
    keyLang: 'MENU.contacttUs',
    url: '',
    type: 'text'
  },
];
